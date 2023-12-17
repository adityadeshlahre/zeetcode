type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col border-l border-r bg-white">
      {children}
    </div>
  );
}
