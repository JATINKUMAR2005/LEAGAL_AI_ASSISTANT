import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Mail, Shield } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Access Request Submitted</CardTitle>
              <CardDescription>Your legal department access request is being processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email Verification Required</p>
                  <p className="text-xs text-muted-foreground">Check your departmental email to verify your account</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Security Review</p>
                  <p className="text-xs text-muted-foreground">
                    Your access request will be reviewed by the IT security team within 24-48 hours
                  </p>
                </div>
              </div>
              <div className="pt-2 text-xs text-muted-foreground">
                For urgent legal matters, contact the department directly at legal-support@dept.gov
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
