function GlowCard({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component className={`glow-card ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}

export default GlowCard
