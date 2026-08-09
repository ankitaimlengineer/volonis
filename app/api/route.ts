import { NextResponse } from 'next/server'
// @ts-ignore
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic';

const globalForPrisma = global as unknown as { prisma: PrismaClient; otpStore: Record<string, { otp: string; expires: number }> }

const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  },
} as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const otpStore = globalForPrisma.otpStore || (globalForPrisma.otpStore = {})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const todayStr = new Date().toISOString().split('T')[0]
    const currentMonthPrefix = todayStr.substring(0, 7)

    if (type === 'billing') {
      const billingList = await prisma.billing.findMany({
        orderBy: { createdAt: 'desc' },
      }).catch(() => [])
      return NextResponse.json({ success: true, data: billingList }, { status: 200 })
    }

    if (type === 'visitor') {
      let visitorLog = await prisma.visitorLog.findFirst({
        where: { date: todayStr }
      }).catch(() => null)

      if (!visitorLog) {
        visitorLog = await prisma.visitorLog.create({
          data: { count: 1, date: todayStr }
        }).catch(() => ({ count: 1 })) as any
      } else {
        visitorLog = await prisma.visitorLog.update({
          where: { id: visitorLog.id },
          data: { count: visitorLog.count + 1 }
        }).catch(() => ({ count: (visitorLog?.count || 0) + 1 })) as any
      }

      return NextResponse.json({ success: true, count: visitorLog?.count || 1 }, { status: 200 })
    }

    if (type === 'projects') {
      let projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
      }).catch(() => [])

      const finalProjects = projects.length > 0 ? projects : [
        {
          id: "1",
          projectId: "PRJ-2026-001",
          name: "Sample Project (Agriculture System)",
          clientName: "Local Farmer",
          category: "Website",
          status: "In Progress",
          progress: 50,
          priority: "High"
        }
      ]

      return NextResponse.json({ 
        success: true, 
        projects: finalProjects, 
        data: finalProjects 
      }, { status: 200 })
    }

    if (type === 'proposals' || type === 'proposal') {
      let proposals = await prisma.proposal.findMany({
        orderBy: { createdAt: 'desc' },
      }).catch(() => [])

      return NextResponse.json({ success: true, data: proposals, proposals }, { status: 200 })
    }

    const subscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' },
    }).catch(() => [])

    const proposalsList = await prisma.proposal.findMany({
      orderBy: { createdAt: 'desc' },
    }).catch(() => [])

    const billingList = await prisma.billing.findMany({
      orderBy: { createdAt: 'desc' },
    }).catch(() => [])

    const todayVisitorRecord = await prisma.visitorLog.findFirst({
      where: { date: todayStr }
    }).catch(() => null)
    const todayVisitorCount = todayVisitorRecord ? todayVisitorRecord.count : 0

    const allLogs = await prisma.visitorLog.findMany().catch(() => [])
    const monthlyVisitorCount = allLogs
      .filter((log: any) => log.date && log.date.startsWith(currentMonthPrefix))
      .reduce((sum: number, log: any) => sum + (log.count || 0), 0)

    let projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    }).catch(() => [])

    const finalProjects = projects.length > 0 ? projects : [
      {
        id: "1",
        projectId: "PRJ-2026-001",
        name: "Sample Project (Agriculture System)",
        clientName: "Local Farmer",
        category: "Website",
        status: "In Progress",
        progress: 50,
        priority: "High"
      }
    ]

    return NextResponse.json({ 
      success: true, 
      data: subscriptions, 
      projects: finalProjects,
      proposals: proposalsList,
      billing: billingList,
      visitorCount: todayVisitorCount,
      monthlyVisitorCount: monthlyVisitorCount
    }, { status: 200 })

  } catch (error: any) {
    console.error("GET API ERROR:", error)
    return NextResponse.json({ 
      success: false, 
      message: error?.message || 'Server error' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { 
      type, email, otp, investment, range, timeline, coreTeam, scopeItems, 
      customerName, productName, plan, amount, paymentId, durationDays, 
      name, fullName, title, clientName, category, status, progress, priority, 
      advancePaid, message, projectDetails, description, subject, workEmail, userEmail, userName,
      itemsList, paid, remaining, total, address 
    } = body

    // 1. Send OTP
    if (type === 'send-otp') {
      if (!email) {
        return NextResponse.json({ success: false, message: 'Email is required!' }, { status: 400 })
      }

      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
      const expires = Date.now() + 10 * 60 * 1000

      otpStore[email] = { otp: generatedOtp, expires }

      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your OTP Code for Verification',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <h2 style="color: #4f46e5;">Verification Code</h2>
              <p>Hello,</p>
              <p>Your One-Time Password (OTP) for verification is:</p>
              <h1 style="background: #f3f4f6; padding: 10px; display: inline-block; letter-spacing: 5px; color: #1f2937;">${generatedOtp}</h1>
              <p>Please do not share this code with anyone. It is valid for 10 minutes.</p>
            </div>
          `
        });

        return NextResponse.json({ success: true, message: 'OTP sent successfully to your email!' }, { status: 200 })
      } catch (mailError: any) {
        console.error("MAIL ERROR:", mailError)
        return NextResponse.json({ success: false, message: 'Failed to send email.' }, { status: 500 })
      }
    }

    // 2. Verify OTP
    if (type === 'verify-otp') {
      if (!email || !otp) {
        return NextResponse.json({ success: false, message: 'Email and OTP are required!' }, { status: 400 })
      }

      const record = otpStore[email]
      if (!record || Date.now() > record.expires) {
        return NextResponse.json({ success: false, message: 'OTP not found or expired!' }, { status: 400 })
      }

      if (record.otp !== otp) {
        return NextResponse.json({ success: false, message: 'Invalid OTP!' }, { status: 400 })
      }

      try {
        await prisma.billing.create({
          data: {
            customerName: String(name || fullName || email.split('@')[0]),
            email: String(email),
            itemsList: 'OTP Verified - Selecting Package',
            total: 0,
            paid: 0,
            remaining: 0,
            status: 'Pending',
          },
        });
      } catch (err) {
        console.error("OTP Billing Save Error:", err)
      }

      delete otpStore[email]
      return NextResponse.json({ success: true, message: 'Email verified successfully!' }, { status: 200 })
    }

    // 3. CONTACT FORM (સુરક્ષિત રીતે Subscription ટેબલમાં સેવ થશે)
    const isContactForm = type === 'contact' || message || projectDetails || description || subject || fullName || name || workEmail;
    if (isContactForm && !investment && !range && !itemsList && type !== 'billing' && type !== 'proposal') {
      const contactName = fullName || name || customerName || userName || 'Website Visitor'
      const contactEmail = email || workEmail || userEmail || 'no-email@domain.com'
      const contactMessage = message || projectDetails || description || subject || 'General Inquiry'

      const newContactSub = await prisma.subscription.create({
        data: {
          customerName: String(contactName),
          email: String(contactEmail),
          productName: `Inquiry: ${String(contactMessage)}`,
          plan: plan || 'Contact Form',
          amount: '0',
          paymentId: paymentId || ('CONTACT_' + Date.now()),
          durationDays: 0,
          status: 'Active',
        },
      })

      return NextResponse.json({ 
        success: true, 
        data: newContactSub, 
        message: 'Inquiry saved to admin panel successfully!' 
      }, { status: 200 })
    }

    // 4. BILLING / COST CALCULATOR / PAYMENT (Billing ટેબલમાં સેવ થશે)
    const finalClientEmail = email || userEmail || workEmail || body.customerEmail;
    if (type === 'billing' || (finalClientEmail && (itemsList || total !== undefined || amount !== undefined || investment || range))) {
      const clientEmail = finalClientEmail || 'no-email@domain.com';
      const calcTotal = Number(total || amount || investment || range || 0);
      const calcPaid = Number(paid || advancePaid || 0);
      const calcRemaining = remaining !== undefined ? Number(remaining) : (calcTotal - calcPaid);
      const calcStatus = status || (calcPaid >= calcTotal ? 'Paid' : (calcPaid > 0 ? 'Partial' : 'Pending'));
      const resolvedCustomerName = customerName || name || userName || fullName || 'Customer';
      const resolvedItemsList = String(itemsList || scopeItems || productName || 'Cost Calculator Package');

      const billingRecord = await prisma.billing.create({
        data: {
          customerName: String(resolvedCustomerName),
          email: String(clientEmail),
          itemsList: resolvedItemsList,
          total: calcTotal,
          paid: calcPaid,
          remaining: calcRemaining,
          status: String(calcStatus),
        },
      });

      // Email Receipt મોકલવા માટે
      if (clientEmail && clientEmail !== 'no-email@domain.com') {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const receiptHtml = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; padding: 30px; text-align: center;">
                <h2 style="margin: 0 0 5px 0; font-size: 22px; letter-spacing: 0.5px;">VOLONIS TECHNOLOGIES</h2>
                <p style="margin: 0; font-size: 13px; opacity: 0.9;">Official Payment Receipt</p>
                <div style="margin-top: 15px; display: inline-block; background-color: #10b981; color: #ffffff; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; text-transform: uppercase;">
                  Payment Successful ✅
                </div>
              </div>
              <div style="padding: 30px; color: #374151;">
                <div style="background-color: #f3f4f6; border-left: 4px solid #4f46e5; padding: 15px; border-radius: 4px; margin-bottom: 25px; font-size: 14px;">
                  <p style="margin: 0 0 5px 0; color: #4b5563;"><strong>Customer Name:</strong> ${resolvedCustomerName}</p>
                  <p style="margin: 0 0 5px 0; color: #4b5563;"><strong>Customer Email:</strong> ${clientEmail}</p>
                  <p style="margin: 0; color: #4b5563;"><strong>Payment ID:</strong> <span style="font-family: monospace; color: #111827; font-weight: bold;">${paymentId || ('PAY_' + Date.now())}</span></p>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 8px;">
                  <tr>
                    <td style="padding: 10px 15px; font-size: 14px; color: #4b5563;">Package / Items:</td>
                    <td style="padding: 10px 15px; font-size: 14px; text-align: right; color: #1f2937; font-weight: bold;">${resolvedItemsList}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 15px; font-size: 14px; color: #4b5563;">Total Payment:</td>
                    <td style="padding: 10px 15px; font-size: 14px; text-align: right; color: #1f2937; font-weight: bold;">₹${calcTotal}</td>
                  </tr>
                  <tr style="border-top: 1px solid #e2e8f0;">
                    <td style="padding: 12px 15px; font-size: 15px; font-weight: bold; color: #10b981;">Paid Amount:</td>
                    <td style="padding: 12px 15px; font-size: 16px; font-weight: bold; text-align: right; color: #10b981;">₹${calcPaid}</td>
                  </tr>
                </table>
                <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 13px;">
                  <p style="margin: 0 0 5px 0; font-size: 15px; font-weight: bold; color: #111827;">Thank You for Your Business!</p>
                  <p style="margin: 3px 0; font-weight: bold; color: #4f46e5;">VOLONIS TECHNOLOGIES</p>
                </div>
              </div>
            </div>
          `;

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: clientEmail,
            subject: 'Payment Receipt & Details',
            html: receiptHtml
          });
        } catch (mailErr) {
          console.error("Receipt Email Error:", mailErr)
        }
      }

      return NextResponse.json({ 
        success: true, 
        data: billingRecord, 
        message: 'Billing record saved successfully!' 
      }, { status: 200 });
    }

    // 5. PROPOSAL
    if (type === 'proposal' || investment) {
      const newProposal = await prisma.proposal.create({
        data: {
          investment: investment || range || '₹69K – ₹87K',
          timeline: timeline || '9 weeks',
          coreTeam: coreTeam || '3 engineers',
          scopeItems: scopeItems || '3 modules',
          status: status || 'Pending Approval',
        },
      });

      return NextResponse.json({ 
        success: true, 
        data: newProposal, 
        message: 'Proposal saved successfully!' 
      }, { status: 200 });
    }

    // 6. PROJECTS
    if (type === 'project' || title || (name && !customerName)) {
      const projectName = name || title || 'New Project'
      const newProject = await prisma.project.create({
        data: {
          name: projectName,
          clientName: clientName || 'General Client',
          category: category || 'Web Development',
          status: status || 'Active',
          progress: Number(progress || 0),
          priority: priority || 'Medium',
        },
      })

      return NextResponse.json({ success: true, data: newProject, message: 'Project saved!' }, { status: 200 })
    }

    // Default Fallback Subscription Save
    const newSubscription = await prisma.subscription.create({
      data: {
        customerName: customerName || name || fullName || 'Guest',
        email: email || workEmail || 'no-email@domain.com',
        productName: productName || 'Inquiry',
        plan: plan || 'Custom',
        amount: String(amount || '0'),
        paymentId: paymentId || 'VOLONIS_' + Date.now(),
        durationDays: Number(durationDays || 30),
        status: 'Active',
      },
    })

    return NextResponse.json({ success: true, data: newSubscription, message: 'Saved successfully!' }, { status: 200 })

  } catch (error: any) {
    console.error("POST API ERROR:", error)
    return NextResponse.json({ 
      success: false, 
      message: error?.message || 'Database save failed' 
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { id, type, status, investment, scopeItems } = body

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID not found!' }, { status: 400 })
    }

    if (type === 'proposal' || !type) {
      const updatedProposal = await prisma.proposal.update({
        where: { id: id },
        data: {
          ...(status && { status }),
          ...(investment && { investment }),
          ...(scopeItems && { scopeItems }),
        },
      })

      return NextResponse.json({ success: true, data: updatedProposal, message: 'Updated successfully!' }, { status: 200 })
    }

    return NextResponse.json({ success: true, message: 'Updated.' }, { status: 200 })
  } catch (error: any) {
    console.error("PUT API ERROR:", error)
    return NextResponse.json({ success: false, message: error?.message || 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID not found!' }, { status: 400 })
    }

    if (type === 'proposal') {
      await prisma.proposal.delete({ where: { id: id } })
      return NextResponse.json({ success: true, message: 'Proposal deleted!' }, { status: 200 })
    }

    if (type === 'project') {
      await prisma.project.delete({ where: { id: id } })
      return NextResponse.json({ success: true, message: 'Project deleted!' }, { status: 200 })
    }

    if (type === 'billing' || type === 'bill') {
      await prisma.billing.delete({ where: { id: id } })
      return NextResponse.json({ success: true, message: 'Billing record deleted!' }, { status: 200 })
    }

    await prisma.subscription.delete({ where: { id: id } })
    return NextResponse.json({ success: true, message: 'Deleted!' }, { status: 200 })
  } catch (error: any) {
    console.error("DELETE API ERROR:", error)
    return NextResponse.json({ success: false, message: error?.message || 'Delete failed' }, { status: 500 })
  }
}