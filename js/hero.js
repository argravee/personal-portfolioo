const availabilityStamp = document.querySelector(".availability-stamp");
const availabilityMonth = document.querySelector("[data-availability-month]");

if (availabilityStamp && availabilityMonth) {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = now.getFullYear().toString().slice(-2);
  const fullMonth = now.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  availabilityMonth.textContent = `${month} '${year}`;
  availabilityStamp.setAttribute(
    "aria-label",
    `Available for freelance work in ${fullMonth}`
  );
}
