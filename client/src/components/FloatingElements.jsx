export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating background elements */}
      <div 
        className="absolute w-64 h-64 top-10 -left-32 opacity-20 rounded-full"
        style={{
          background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-96 h-96 top-1/2 -right-48 opacity-15 rounded-full"
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute w-48 h-48 bottom-20 left-1/4 opacity-20 rounded-full"
        style={{
          background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(245, 158, 11, 0.1))',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '4s'
        }}
      />
      
      {/* Additional floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-primary opacity-20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`
          }}
        />
      ))}
    </div>
  );
}