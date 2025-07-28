import heroImage from '@/assets/port.jpg';

const HeroSection = () => {
  return (
    <section id="intro" className="relative h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image with Fade Animation */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Hero landscape"
          className="w-full h-full object-cover hero-fade-animation"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-entrance">
          <h1 className="text-6xl lg:text-8xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Eyob Wasihun
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-lg">
            Software Engineer & Full Stack Developer 
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105"
            >
              Explore My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;