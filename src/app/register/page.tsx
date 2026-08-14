import { SignUp } from '@clerk/nextjs';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <SignUp 
          routing="path" 
          path="/register"
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-white border border-[#e8e4dc] shadow-none rounded-sm',
              headerTitle: 'font-serif text-2xl text-[#2c2c2c]',
              headerSubtitle: 'text-[#9e9488] font-light',
              socialButtonsBlockButton: 'border-[#e8e4dc] hover:bg-[#faf8f5]',
              formFieldLabel: 'text-xs font-medium tracking-wide uppercase text-[#9e9488]',
              formFieldInput: 'border-[#e8e4dc] focus:border-[#8a9a7b] focus:ring-0 rounded',
              formButtonPrimary: 'bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white rounded',
              footerActionLink: 'text-[#2c2c2c] font-medium',
              dividerLine: 'bg-[#e8e4dc]',
              dividerText: 'text-[#9e9488]',
            }
          }}
        />
      </div>
    </div>
  );
}
