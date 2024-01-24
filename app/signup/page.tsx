import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import UnprotectedNav from "@/components/ui/unprotectednav";
import AuthForm from "../auth-form";

function AuthComponent() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Supabase Auth + Storage</h1>
        <p>
          Experience our Auth and Storage through a simple profile management
          example. Create a user profile and upload an avatar image. Fast,
          simple, secure.
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to the Sisodev App",
};

export default function Page() {
  return (
    <>
      <UnprotectedNav />
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <Section className="print-force-new-page scroll-mb-16">
            <AuthComponent />
          </Section>
        </section>
      </main>
    </>
  );
}
