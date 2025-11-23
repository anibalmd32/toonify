import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";

interface VerificationEmailProps {
  url: string;
  userEmail?: string;
}

export const VerificationEmail = ({
  url,
  userEmail = "toonify user",
}: VerificationEmailProps) => {
  const previewText = `Bienvenido a Toonify. Verifica tu email para comenzar.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: {
                  start: "#00C6FF",
                  end: "#5A4FCF",
                  dark: "#1a1a1a",
                  light: "#f5f5f5",
                },
              },
            },
          },
        }}
      >
        <Body className="bg-white font-sans text-brand-dark my-auto mx-auto px-2">
          <Container className="border border-gray-100 my-10 rounded-3xl mx-auto p-8 max-w-[480px] shadow-2xl relative overflow-hidden">
            {/* Background Decoration - using Section instead of absolute div for better support */}
            <Section
              style={{
                background: "linear-gradient(90deg, #00C6FF 0%, #5A4FCF 100%)",
                height: "8px",
                width: "100%",
              }}
            />

            {/* LOGO HEADER */}
            <Section className="mt-8 mb-8 text-center">
              <Text className="text-4xl font-black tracking-tighter m-0 text-[#5A4FCF]">
                toonify
              </Text>
            </Section>

            {/* CONTENIDO PRINCIPAL */}
            <Heading className="text-2xl font-bold text-center p-0 my-4 mx-0 text-gray-900">
              Verifica tu correo electrónico
            </Heading>

            <Text className="text-base leading-relaxed text-gray-600 text-center mb-8">
              ¡Hola <strong>{userEmail}</strong>! <br />
              Estamos emocionados de que te unas a Toonify. Para asegurar la
              seguridad de tu cuenta, por favor verifica tu dirección haciendo
              clic abajo.
            </Text>

            {/* BOTÓN CTA CON GRADIENTE */}
            <Section className="text-center my-8">
              <Button
                className="rounded-xl text-white text-base font-bold no-underline text-center py-4 px-10 block shadow-xl"
                href={url}
                style={{
                  background:
                    "linear-gradient(135deg, #00C6FF 0%, #5A4FCF 100%)",
                  boxShadow: "0 10px 20px -10px rgba(90, 79, 207, 0.5)",
                  color: "#ffffff",
                }}
              >
                Verificar mi cuenta
              </Button>
            </Section>

            <Text className="text-sm text-gray-400 text-center mt-8 mb-4">
              O copia y pega este enlace en tu navegador:
              <br />
              <Link
                className="text-[#5A4FCF] underline break-all font-medium"
                href={url}
              >
                {url}
              </Link>
            </Text>

            <Hr className="border-gray-100 my-8" />

            {/* FOOTER */}
            <Text className="text-xs text-gray-400 text-center leading-relaxed">
              Si no solicitaste esta verificación, puedes ignorar este correo
              con seguridad.
              <br />
              <span className="opacity-50">
                © {new Date().getFullYear()} Toonify Inc. Todos los derechos
                reservados.
              </span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const renderTemplate = async (props: VerificationEmailProps) => {
  return await render(<VerificationEmail {...props} />);
};

export default VerificationEmail;
