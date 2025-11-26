import { ProgressProvider } from "@bprogress/react";
import type { QueryClient } from "@tanstack/react-query";
import {
  ClientOnly,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { Session, User } from "better-auth/types";
import { ProgressSubscriber } from "@/components/ProgressSubscriber";
import { Toast } from "@/components/Toast";
import type { TRPCRouter } from "@/integrations/trpc/router";
import { i18n, setSSRLanguage } from "@/lib/i18n";
import { fetchUserSession } from "@/utils/auth-fn";
import appCss from "../styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
  auth: {
    user: User | null;
    session: Session | null;
  };
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content:
          "Genera prompts con la sintaxis perfecta para cualquier LLM, desde ChatGPT hasta Bing, para mejorar la calidad de los resultados. ¡Experimenta con diferentes modelos y personaliza tus prompts! ¡Descubre cómo mejorar tus interacciones con IA!",
      },
      {
        title: "Syntaxia",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
    ],
  }),
  shellComponent: RootDocument,
  beforeLoad: async () => {
    setSSRLanguage();
    const session = await fetchUserSession();

    return {
      auth: session,
    };
  },
});

function RootDocument({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentLang = i18n.language;

  return (
    <html data-theme="syntaxia" lang={currentLang}>
      <head>
        <HeadContent />
      </head>
      <body>
        <main className="min-h-screen w-full bg-base-200 relative selection:bg-primary selection:text-primary-content font-sans text-base-content antialiased">
          <div className="relative z-10">
            <ProgressProvider color="#18a5f2">
              <ProgressSubscriber>
                <ClientOnly>
                  {children}
                  <Toast />
                </ClientOnly>
              </ProgressSubscriber>
            </ProgressProvider>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
