import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { profileData } from "@/data/PortfolioData";
import { publicSite, siteUrl } from "@/lib/metadata/public";

/* eslint-disable @next/next/no-img-element */

export const alt = publicSite.defaultTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function PublicShareImage() {
  const avatar = await readFile(
    join(process.cwd(), "public", "img", "profile", "dony.jpg")
  );
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#fffdf9",
          color: "#111111",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 18,
            display: "flex",
            background: "#ff5a52",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 60,
            width: 78,
            height: 78,
            display: "flex",
            border: "4px solid #111111",
            background: "#ff5a52",
            transform: "rotate(12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: 42,
            width: 52,
            height: 52,
            display: "flex",
            border: "4px solid #111111",
            background: "#ffffff",
            transform: "rotate(-10deg)",
          }}
        />

        <div
          style={{
            margin: 56,
            display: "flex",
            flex: 1,
            gap: 34,
            padding: 34,
            border: "4px solid #111111",
            background: "#ffffff",
            boxShadow: "14px 14px 0 #111111",
          }}
        >
          <div
            style={{
              width: 280,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "10px 16px",
                border: "4px solid #111111",
                background: "#ff5a52",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "0.18em",
              }}
            >
              PORTFOLIO
            </div>

            <div
              style={{
                display: "flex",
                minHeight: 320,
                width: "100%",
                overflow: "hidden",
                border: "4px solid #111111",
                borderRadius: 28,
                background: "#ff5a52",
              }}
            >
              <img
                src={avatarSrc}
                alt={profileData.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  padding: "8px 14px",
                  border: "4px solid #111111",
                  background: "#111111",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                }}
              >
                VIDEO EDITOR • MOTION DESIGN
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 78,
                  lineHeight: 0.92,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                }}
              >
                {profileData.name}
              </div>

              <div
                style={{
                  display: "flex",
                  maxWidth: 640,
                  fontSize: 28,
                  lineHeight: 1.35,
                }}
              >
                {publicSite.defaultDescription}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  Selected work, resume, and contact
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 22,
                  }}
                >
                  {siteUrl.host}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  padding: "14px 18px",
                  border: "4px solid #111111",
                  background: "#fff7c2",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                }}
              >
                {profileData.location.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
