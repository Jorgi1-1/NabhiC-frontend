import React from "react";
import { Link } from "wasp/client/router";
import { LoginForm } from "wasp/client/auth";

export default function Login() {
  return (
    <div className="w-full h-full bg-white">
      <div className="min-w-full min-h-[75vh] flex items-center justify-center">
        <div className="w-full h-full max-w-sm p-5 bg-white">
          <div>
            <LoginForm
              appearance={{
                colors: {
                  brand: 'var(--auth-form-brand)',
                  brandAccent: 'var(--auth-form-brand-accent)',
                  submitButtonText: 'var(--auth-form-submit-button-text-color)',
                }
              }}
            />
            <div className="mt-4 text-center">
              Si no tienes cuenta...{" "}
              <Link to="/signup" className="text-primary-500 hover:text-primary-800 underline">
                crea una cuenta
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}