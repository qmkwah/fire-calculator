export const metadata = {
  title: 'Coast FIRE Calculator - When Can You Stop Saving?',
  description: 'Calculate how much you need to save now to coast to financial independence. Free Coast FIRE calculator with detailed results and projections.',
  keywords: 'coast fire, fire calculator, financial independence, early retirement, savings calculator',
  openGraph: {
    title: 'Coast FIRE Calculator - Free FIRE Planning Tool',
    description: 'Discover when you can stop saving and still reach financial independence. Calculate your Coast FIRE number now.',
    type: 'website',
  },
};

export default function CoastFireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}