import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/config";

export const alt = siteConfig.brand.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const iconBuffer = await readFile(join(process.cwd(), "public/brand/orbita-icon.png"));
  const iconSrc = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #05070f 0%, #0a1530 45%, #142c63 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(24,176,224,0.35) 0%, rgba(24,176,224,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -100,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,106,232,0.3) 0%, rgba(124,106,232,0) 70%)",
            display: "flex",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} width={128} height={128} alt="" style={{ marginBottom: 34 }} />

        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}>
            ÓRBITA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 500,
              color: "#a9b4cc",
              marginLeft: 22,
              letterSpacing: -1,
            }}
          >
            Digital
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: "#5fd3ef", marginTop: 28 }}>
          Tecnología para vender, organizar y crecer.
        </div>
      </div>
    ),
    { ...size }
  );
}
