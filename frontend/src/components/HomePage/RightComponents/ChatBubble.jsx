// export function ChatBubble({ message, image, isSender, time , status }) {
//   const imageWidth = 200;
//   return (
//     <div
//       style={{
//         width: '54vw',
//         display: "flex",
//         justifyContent: isSender ? "flex-end" : "flex-start",
//         marginBottom: "8px",
//         padding: "0 10px",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: isSender ? "#1976d2" : "#d9fdd3",
//           color: isSender ? "white" : "black",
//           maxWidth: "70%",
//           padding: "10px 15px",
//           borderRadius: "16px",
//           borderTopRightRadius: isSender ? "4px" : "16px",
//           borderTopLeftRadius: isSender ? "16px" : "4px",
//           fontSize: "16px",
//           lineHeight: "1.4",
//           wordBreak: "break-word",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           gap: "8px",
//           position: "relative",
//         }}
//       >
//         {image && (
//           <img
//             src={image}
//             alt="Chat Image"
//             style={{
//               width: `${imageWidth}px`,
//               height: "auto",
//               borderRadius: "8px",
//               display: "block",
//             }}
//           />
//         )}



// <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "10px" }}>
//   <div style={{ flex: 1, wordBreak: "break-word" }}>{message}</div>
//   <span
//     style={{
//       fontSize: "12px",
//       opacity: 0.7,
//       whiteSpace: "nowrap",
//       alignSelf: "flex-end",
//     }}
//   >
//     {time} {isSender && (status === "sent" ? "✓✓" : "✓")}
//   </span>
// </div>


//       </div>
//     </div>
//   );
// }





export function ChatBubble({ message, image, isSender, time, status }) {
  
  const imageWidth = 300;

  return (
    <div
      style={{
        width: "54vw",
        display: "flex",
        justifyContent: isSender ? "flex-end" : "flex-start",
        marginBottom: "8px",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          backgroundColor: isSender ? "#1976d2" : "#d9fdd3",
          color: isSender ? "white" : "black",
          maxWidth: "70%",
          padding: "10px 15px",
          borderRadius: "16px",
          borderTopRightRadius: isSender ? "4px" : "16px",
          borderTopLeftRadius: isSender ? "16px" : "4px",
          fontSize: "16px",
          lineHeight: "1.4",
          wordBreak: "break-word",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        {/* Image (optional) */}
        {image && (
          <img
            src={image}
            alt="Chat Image"
            style={{
              width: `${imageWidth}px`,
              height: "auto",
              borderRadius: "8px",
              display: "block",
            }}
          />
        )}

        {/* Text + time/status row */}
        {(message || time) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "8px",    
              width: "100%",
              maxWidth: image ? `${imageWidth}px` : "100%",
            }}
          >
            {/* Message text */}
            <div style={{ flex: 1, wordBreak: "break-word" }}>{message}</div>

            {/* Time + Status */}
            <span
              style={{
                fontSize: "12px",
                opacity: 0.7,
                whiteSpace: "nowrap",
                alignSelf: "flex-end",
              }}
            >
              {time} {isSender && (status === "sent" ? "✓✓" : "✓")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
