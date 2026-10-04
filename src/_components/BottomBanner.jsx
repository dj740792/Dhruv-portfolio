export default function BottomBanner() {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <img
        src="/banner.gif"
        alt="banner"
        className="absolute inset-0 block h-full w-full object-cover object-middle"
      />
    </div>
  );
}
