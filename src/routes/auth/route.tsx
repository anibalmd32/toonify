import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BgAnimatedGradient } from "@/components/BgAnimatedGradient";
import { LangSelect } from "@/components/LangSelector";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ context }) => {
    if (context.auth?.session) {
      throw redirect({
        to: "/app/home",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
      <BgAnimatedGradient />
      <div className="absolute top-4 left-4 z-50">
        <LangSelect />
      </div>

      <div className="w-full max-w-md z-10">
        <Outlet />
      </div>

      {/* <div className="absolute bottom-4 text-center w-full z-10">
        <p className="text-xs text-base-content/40">
          © {new Date().getFullYear()} Toonify Inc.
        </p>
      </div> */}
    </div>
  );
}
