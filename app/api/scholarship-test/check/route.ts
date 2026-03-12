import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { applicationId } = await req.json();

        if (!applicationId) {
            return NextResponse.json(
                { success: false, error: 'Application ID is required' },
                { status: 400 }
            );
        }

        // Call Google Apps Script for verification
        try {
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbwqdU49riG5o69LA9I2IqCqnaZVe6ZxD0idPSKjhPOvU-PAY4pXuLXeH1PMupr1kKsD/exec',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'checkScholarship',
                        applicationId: applicationId
                    }),
                }
            );

            const result = await response.json();
            
            if (result.exists) { // This means "Taken Test" is already Yes
                return NextResponse.json({ 
                    success: true, 
                    exists: true, 
                    message: 'You have already taken this test.' 
                });
            }

            if (!result.verified) { // ID not found in master sheet
                return NextResponse.json({ 
                    success: true, 
                    verified: false,
                    message: 'Invalid Application ID.'
                });
            }

            // User verified and hasn't taken the test
            return NextResponse.json({ 
                success: true, 
                verified: true,
                exists: false,
                userData: result.userData // First Name, Email, etc.
            });

        } catch (err) {
            console.error('Google Sheets Check Error:', err);
            return NextResponse.json({ 
                success: true, 
                exists: false,
                warning: 'Could not verify existence, allowing proceed'
            });
        }
    } catch (err: any) {
        console.error('Scholarship Check API Error:', err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
