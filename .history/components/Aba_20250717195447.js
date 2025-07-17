// app/components/Logo.js or wherever your components live

export default function Logo() {
  return (
    <div className="w-[70px] h-[70px]">
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 48H70V70H0V48Z" fill="#E1232E" />
        <foreignObject x="-7.81395" y="-7.81395" width="85.6279" height="63.6279">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              backdropFilter: "blur(3.91px)",
              clipPath: "url(#bgblur_0_18265_3511_clip_path)",
              height: "100%",
              width: "100%",
            }}
          />
        </foreignObject>
        <path data-figma-bg-blur-radius="7.81395" d="M0 0H70V48H0V0Z" fill="#055E7C" />
        <path
          d="M26.6445 31.265H23.8945L23.0283 28.6859H18.082L17.25 31.265H14.4873L19.0234 18.7191H22.0518L26.6445 31.265ZM36.3281..."
          fill="white"
        />
        <path fillRule="evenodd" clipRule="evenodd" d="M56.5 20.9851H58.9607V16H56.5V20.9851Z" fill="#ED1C24" />
        <path
          d="M49.6689 62.5801L48.1094 62.5928L47.7256 62.2344L46.875 61.4365L45.6982 60.334H47.2578L49.6689 62.5801ZM21.291..."
          fill="white"
        />
        <defs>
          <clipPath id="bgblur_0_18265_3511_clip_path" transform="translate(7.81395 7.81395)">
            <path d="M0 0H70V48H0V0Z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
