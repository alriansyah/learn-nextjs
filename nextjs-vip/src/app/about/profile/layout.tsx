function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex flex-col items-center justify-center gap-1">
      <h1 className="text-black">Profile Layout</h1>
      <>{children}</>
    </main>
  );
}

export default ProfileLayout;
