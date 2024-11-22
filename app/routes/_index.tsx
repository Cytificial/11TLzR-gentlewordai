import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `AI-Optimized Prompts`,
      description: `Get perfectly crafted prompts that maximize AI output quality and save hours of trial and error.`,
      icon: <i className="las la-magic"></i>,
    },
    {
      heading: `Context-Aware Generation`,
      description: `Our smart system understands your needs and generates prompts tailored to your specific use case.`,
      icon: <i className="las la-brain"></i>,
    },
    {
      heading: `Cross-Platform Compatible`,
      description: `Works seamlessly with ChatGPT, DALL-E, Midjourney and other popular AI tools.`,
      icon: <i className="las la-sync"></i>,
    },
    {
      heading: `Instant Results`,
      description: `Generate professional-grade prompts in seconds instead of spending 15+ minutes crafting them.`,
      icon: <i className="las la-bolt"></i>,
    },
    {
      heading: `Best Practices Built-in`,
      description: `Every prompt follows proven frameworks and techniques used by AI experts.`,
      icon: <i className="las la-check-double"></i>,
    },
    {
      heading: `Learning Assistant`,
      description: `Improve your own prompt writing skills by learning from our generated examples.`,
      icon: <i className="las la-graduation-cap"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Content Marketing Manager`,
      content: `This tool has completely transformed how I work with AI. What used to take me 20 minutes of prompt tweaking now takes seconds. The quality of AI outputs has improved dramatically.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `Digital Agency Owner`,
      content: `We've integrated this into our workflow and it's been a game-changer. Our team saves hours every week and delivers more consistent results to clients.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `David Park`,
      designation: `Software Developer`,
      content: `As someone who uses AI tools daily, this prompt generator has become indispensable. It's like having an AI expert guiding you 24/7.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for individuals just getting started with AI`,
      monthly: 9,
      yearly: 89,
      features: [`50 prompts/month`, `Basic templates`, `Email support`],
    },
    {
      title: `Professional`,
      description: `Ideal for power users and small teams`,
      monthly: 29,
      yearly: 290,
      features: [
        `Unlimited prompts`,
        `Advanced templates`,
        `Priority support`,
        `API access`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 99,
      yearly: 990,
      features: [
        `Custom templates`,
        `Dedicated manager`,
        `Training sessions`,
        `SLA guarantee`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the prompt generator work?`,
      answer: `Our AI analyzes your requirements and instantly generates optimized prompts using proven frameworks and best practices. Simply describe your goal, and we'll create the perfect prompt.`,
    },
    {
      question: `Which AI platforms are supported?`,
      answer: `Our prompts work with all major AI platforms including ChatGPT, DALL-E, Midjourney, Stable Diffusion, and more. The generated prompts are platform-agnostic and can be adapted as needed.`,
    },
    {
      question: `Do you offer refunds?`,
      answer: `Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll provide a full refund, no questions asked.`,
    },
    {
      question: `Can I upgrade or downgrade my plan?`,
      answer: `Absolutely! You can change your plan at any time. The changes will take effect in your next billing cycle.`,
    },
  ]

  const steps = [
    {
      heading: `Describe Your Goal`,
      description: `Tell us what you want to achieve with AI in plain language`,
    },
    {
      heading: `Get Optimized Prompts`,
      description: `Receive instantly generated, professionally crafted prompts`,
    },
    {
      heading: `Use With Any AI Tool`,
      description: `Copy and paste into your favorite AI platform`,
    },
    {
      heading: `Get Better Results`,
      description: `Enjoy higher quality AI outputs and save time`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Spending ages crafting prompts that don't work`,
    },
    {
      emoji: `😤`,
      title: `Getting inconsistent or poor quality AI responses`,
    },
    {
      emoji: `😩`,
      title: `Wasting money on AI tools you can't use effectively`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Master AI Tools Without Being a Prompt Engineer`}
        subtitle={`Get expertly crafted AI prompts in seconds. Stop wasting time on trial and error.`}
        buttonText={`Start Generating Better Prompts`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/11TLzR-gentlewordai-rOQ8`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`from happy AI users`}
          />
        }
      />
      <LandingSocialProof title={`Featured on`} />
      <LandingPainPoints
        title={`68% of AI users waste 15+ minutes per prompt, costing businesses thousands in lost productivity`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Get Better AI Results in 4 Simple Steps`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Master AI Prompting`}
        subtitle={`Professional-grade prompts at your fingertips`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of Users Already Saving Time with Better Prompts`}
        subtitle={`See how others are transforming their AI workflow`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Start Generating Better AI Prompts Today`}
        subtitle={`Choose the plan that fits your needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Our Prompt Generator`}
        subtitle={`Everything you need to know to get started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Stop Wasting Time on Bad Prompts`}
        subtitle={`Join thousands of users getting better AI results in less time`}
        buttonText={`Start Generating Better Prompts`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
