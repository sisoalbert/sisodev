import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import AuthForm from "../../components/auth-form";

function AuthComponent() {
  return (
    <div className="row">
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "login",
  description: "Login to the Sisodev App",
};

export default function Page() {
  return (
    <>
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
