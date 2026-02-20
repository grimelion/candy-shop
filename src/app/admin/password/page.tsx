import { PasswordForm } from "./_components/password-form"

export default function ChangePasswordPage() {
  return (
    <div className="max-w-sm">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1 md:mb-2">
        Change Password
      </h1>
      <p className="text-sm text-slate-500 mb-4 md:mb-6">
        After changing, use your new password on the next login.
      </p>
      <PasswordForm />
    </div>
  )
}
