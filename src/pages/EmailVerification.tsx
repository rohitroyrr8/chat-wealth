import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Link } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = () => {
    if (code.length === 6) {
      console.log("Verifying code:", code);
      // Handle verification logic here
    }
  };

  const handleResend = () => {
    if (canResend) {
      setCountdown(59);
      setCanResend(false);
      console.log("Resending verification code");
      // Handle resend logic here
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card shadow-elevated">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Verify Your Email</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A 6-digit verification code has been sent to your email address. Please enter it below.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup className="gap-3">
                <InputOTPSlot 
                  index={0} 
                  className="w-12 h-12 text-lg font-semibold bg-input text-foreground rounded-lg"
                />
                <InputOTPSlot 
                  index={1} 
                  className="w-12 h-12 text-lg font-semibold bg-input text-foreground rounded-lg"
                />
                <InputOTPSlot 
                  index={2} 
                  className="w-12 h-12 text-lg font-semibold bg-input text-foreground rounded-lg"
                />
                <InputOTPSlot 
                  index={3} 
                  className="w-12 h-12 text-lg font-semibold bg-input text-foreground rounded-lg"
                />
                <InputOTPSlot 
                  index={4} 
                  className="w-12 h-12 text-lg font-semibold bg-input text-foreground rounded-lg"
                />
                <InputOTPSlot 
                  index={5} 
                  className="w-12 h-12 text-lg font-semibold bg-input text-foreground rounded-lg"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button 
            onClick={handleVerify}
            disabled={code.length !== 6}
            className="w-full h-12 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Verify Code
          </Button>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-primary hover:underline text-sm font-medium"
            >
              Go Back
            </Link>
          </div>

          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm ${
                canResend 
                  ? "text-primary hover:underline cursor-pointer" 
                  : "text-muted-foreground cursor-not-allowed"
              }`}
            >
              Resend Code {!canResend && `(${formatTime(countdown)})`}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmailVerification;