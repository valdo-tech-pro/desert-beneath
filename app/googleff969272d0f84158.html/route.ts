import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('google-site-verification: googleff969272d0f84158', {
    headers: { 'Content-Type': 'text/html' },
  })
}
