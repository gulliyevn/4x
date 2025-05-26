export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-white">
      {/* Header */}
      <header className="bg-primary p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-secondary">4X Trading Platform</h1>
          <p className="text-secondary/80 mt-2">Advanced trading for forex and financial markets</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Trading Card */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Live Trading</h2>
            <p className="text-gray-300 mb-4">Access real-time market data and execute trades instantly.</p>
            <button className="bg-accent hover:bg-accent/80 text-secondary px-4 py-2 rounded-md font-medium transition-colors">
              Start Trading
            </button>
          </div>

          {/* Analytics Card */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Market Analytics</h2>
            <p className="text-gray-300 mb-4">Advanced charts and technical analysis tools.</p>
            <button className="bg-accent hover:bg-accent/80 text-secondary px-4 py-2 rounded-md font-medium transition-colors">
              View Charts
            </button>
          </div>

          {/* Portfolio Card */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Portfolio</h2>
            <p className="text-gray-300 mb-4">Track your investments and performance metrics.</p>
            <button className="bg-accent hover:bg-accent/80 text-secondary px-4 py-2 rounded-md font-medium transition-colors">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <h3 className="text-lg font-semibold text-white">Real-time Data</h3>
                <p className="text-gray-300">Live market feeds and instant price updates</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <h3 className="text-lg font-semibold text-white">Advanced Analytics</h3>
                <p className="text-gray-300">Comprehensive technical analysis tools</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <h3 className="text-lg font-semibold text-white">Secure Trading</h3>
                <p className="text-gray-300">Bank-level security and encryption</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <h3 className="text-lg font-semibold text-white">24/7 Support</h3>
                <p className="text-gray-300">Round-the-clock customer assistance</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
