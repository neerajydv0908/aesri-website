/**
 * Re-mounted on every navigation, so the CSS fade replays for each page.
 * Opacity only (no transform) so fixed/sticky elements inside pages behave.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
