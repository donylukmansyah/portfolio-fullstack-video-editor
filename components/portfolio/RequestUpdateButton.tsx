"use client";

import Swal from "sweetalert2";
import { profileData } from "@/data/PortfolioData";

interface Props {
  className?: string;
}

export default function RequestUpdateButton({ className }: Props = {}) {
  const handleClick = async () => {
    await Swal.fire({
      title: "Request information update",
      html: `
        <div style="display:grid;gap:18px;text-align:left;padding:4px 4px 6px 4px;">
          <p style="margin:0;font-size:0.95rem;line-height:1.6;font-weight:500;">
            Kalau ada detail portfolio yang perlu diupdate, kamu bisa hubungi Dony lewat social channel di bawah ini.
          </p>
          <div style="display:grid;gap:12px;">
            ${profileData.socialLinks
              .map(
                (link) => `
                  <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                    style="
                      display:flex;
                      align-items:center;
                      justify-content:center;
                      gap:8px;
                      border:2px solid #000;
                      border-radius:8px;
                      background:${link.type === "website" ? "#fff" : "var(--main)"};
                      color:#000;
                      padding:14px 16px;
                      text-decoration:none;
                      font-weight:700;
                      font-size:0.95rem;
                      box-shadow:4px 4px 0px 0px #000;
                      transition:all 0.15s ease;
                    "
                    onmouseover="this.style.transform='translate(4px,4px)';this.style.boxShadow='none';"
                    onmouseout="this.style.transform='translate(0,0)';this.style.boxShadow='4px 4px 0px 0px #000';"
                  >
                    ${link.name} →
                  </a>
                `
              )
              .join("")}
          </div>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Open website →",
      cancelButtonText: "Close",
      buttonsStyling: false,
      scrollbarPadding: false,
      customClass: {
        popup: "neo-swal-popup !border-[3px]",
        htmlContainer: "!overflow-visible",
        actions: "!mb-2 !mt-6",
        confirmButton: "neo-swal-confirm",
        cancelButton: "neo-swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(profileData.websiteUrl, "_blank", "noopener,noreferrer");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`neo-btn text-xs font-heading ${className || ""}`}
      id="request-update-button"
    >
      Request information update
    </button>
  );
}
