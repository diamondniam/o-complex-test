import DOMPurify from "dompurify";

export default function Review({ data }) {
  const getCleanHTML = (html) => {
    return DOMPurify.sanitize(html);
  };

  return (
    <div className="bg-[var(--primary-darker)] rounded-lg p-3">
      <div className="line-clamp-6 defaultTextStyles">
        <div
          dangerouslySetInnerHTML={{ __html: getCleanHTML(data.text) }}
        ></div>
      </div>
    </div>
  );
}
