import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrganization } from "@/actions/organizations";
import OrgSwitcher from "@/components/org-switcher";
import ProjectList from "./_components/project-list";
import UserIssues from "./_components/user-issues";
import GlobalStyles from "./_components/styles";

export default async function OrganizationPage({ params }) {
  const { orgId } = params;
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const organization = await getOrganization(orgId);

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0C0A09]">
      <GlobalStyles />

      {/* Background Effects */}
      <div className="fixed inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A1614]/90 to-black" />

        {/* Grainy texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />

        {/* Glass-like beige circles */}
        <div className="absolute top-[-10%] left-[5%] w-[70vw] h-[70vw] rounded-full bg-[#DEB887]/[0.02] backdrop-blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#8B4513]/[0.01] backdrop-blur-2xl" />
      </div>

      {/* Sticky Header/Navbar */}
      <div className="sticky top-0 z-30 bg-[#0C0A09]/80 backdrop-blur-md border-b border-[#DEB887]/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#DEB887] via-[#D2B48C] to-[#8B4513] bg-clip-text text-transparent">
                {organization.name}&rsquo;s Projects
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DEB887]/20 to-transparent" />
            </div>
            <OrgSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Projects Section */}
        <div className="relative group mb-12 animate-fade-in">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
          <div className="relative p-6 rounded-xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md">
            <ProjectList orgId={organization.id} />
          </div>
        </div>

        {/* User Issues Section */}
        <div className="relative group animate-fade-in-delay">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
          <div className="relative p-6 rounded-xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md">
            <UserIssues userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
