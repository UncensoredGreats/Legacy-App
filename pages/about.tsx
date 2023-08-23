import React from 'react';
import { Accordion, Button, Container, Icon, List, Header } from 'semantic-ui-react';
import Layout from '../Components/homepageMenu/Layout';

// Section 1
const JustGetStarted = (
    <List>
        <List.Item>
            <Header as='h4'>Before Sign-up:</Header>
            <p></p>
            <p>Search any topic on the Semantic Library page; get the most related text snippets from 1000s of classic books.</p>
            <p>Find it in the full ebook by clicking on any thumbnail and using the native text-search.</p>
            <p>Access all posts on the Timeless Media page and all the e-books from where they originate.</p>
            <p></p>
        </List.Item>
        <List.Item>
            <Header as='h4'>After Signup:</Header>
            <p></p>
            <p>Visit the Great’s page to chat with authors.</p>
            <p>Click the star on any messages to save them to your library for later.</p>
            <p>Read the sources on the back of these messages, or even the full ebooks, with a single click.</p>
        </List.Item>
    </List>
);

const Mission = (
  <p>To deliver AI based on primary sources that contradict the censorship of Big Tech AI.</p>
);

const TermsOfService = (
    <List>
        <p>We aim to realize our mission by championing values diametrically opposed to Big Tech's practices. Drawing inspiration from a manifesto that Big Tech AI is incapable of interpreting, we embody the Cypherpunk Ideal, or ‘Privacy for the Individual, Transparency for the Organization [taken to its logical extreme].’ Here’s how we do it.</p>
        <List.Item>
            <Header as='h4'>Everything is Open-Source:</Header>
            <List bulleted>
                <List.Item>Main App: <a href="https://github.com/evanmcfarland/UncensoredGreatsCore">UncensoredGreatsCore</a></List.Item>
                <List.Item>AI Summarizer: <a href="https://github.com/evanmcfarland/UncensoredGreatsSummarizer">UncensoredGreatsSummarizer</a></List.Item>
                <List.Item>E-reader: <a href="https://github.com/evanmcfarland/uncensoredgreats-ereader">uncensoredgreats-ereader</a></List.Item>
            </List>
        </List.Item>
        <List.Item>
            <Header as='h4'>Transparent Finances:</Header>
            <p>50% of our revenue goes directly to Authors, E-book Aggregators, and Open-Source Projects that empower us. The remainder supports our employees, stakeholders, and operational expenses in an equally transparent manner.</p>
            <p>While the app is currently free, we plan to move to a subscription model and do this so all patrons will be able to see exactly what person their money ended up going to.</p>
            <p>Though this is not available yet, we will publicly release all the data collected from this app, in an anonymized format, along with reports on our findings.</p>
            <p>All AI response generation details on this site are also transparent. Just click the metadata tag to see the raw request inputs, and click on any of the post-input sources to read the full ebook.</p>
            <p>***</p>
            <p>Concerning privacy for the individual, we reconcile with this radical transparency best we can. All the data we save is the same data that you see in your personal library as well. Chat messages that you don’t interact with are purposefully not stored in cache, cookies or otherwise. All your saved interactions are shared anonymously by default. For more privacy, you can just use an anonymous email on signup (limit 2 per device). Censorship is reserved exclusively for bots until we develop a way to address this autonomously.</p>
        </List.Item>
    </List>
)

const Why = (
    <List bulleted>    
    <p>AI systems might seem a reflection of Mankind, drawing from the vast Public Internet. However, we argue the Internet isn't an accurate mirror. We believe content on the Internet is assorted, curated, and molded with an exceptionally modern bent that wrongfully prioritizes:</p>
        <List.Item>Social norms over inconvenient truths</List.Item>
        <List.Item>Institutional interests over individual values</List.Item>
        <List.Item>Negative over thoughtful engagement</List.Item>
        <List.Item>Images over text</List.Item>
        <List.Item>The happenings of today over those of yesterday</List.Item>
        <List.Item>Chaos over Consensus</List.Item>
    <p>The result, we believe, is an algorithmically perpetuated hivemind that is baked into every AI (LLM-specific) system today. Our goal isn't just to say it but to provide tools for everyone to discern it themselves.</p>
    </List>
)

const How = (
    <List bulleted>
        <p>We aim to reverse-engineer patterns shaping today's Internet and juxtapose them against AI's representation of revered, often overlooked thinkers.</p>
        <List.Item>
            <strong>Relative Truth over Mass Opinion:</strong> Our AI uses primary sources to echo specific individuals or groups.
        </List.Item>
        <List.Item>
            <strong>Individual Discovery over Algorithmic Homogenization:</strong> Users handpick texts, promoting personalized exploration.
        </List.Item>
        <List.Item>
            <strong>Thoughtful Engagement over Instant Gratification:</strong> Users can react to content, guiding our algorithm towards consensus.
        </List.Item>
        <List.Item>
            <strong>Text-Centricity over Visual Overload:</strong> Prioritizing written content over fleeting visual stimuli.
        </List.Item>
        <List.Item>
            <strong>Timelessness over Trending:</strong> Our algorithm equally values enduring truths, irrespective of their age.
        </List.Item>
        <List.Item>
            <strong>Consensus Over Chaos:</strong> Controversial topics are threaded, letting users follow evolving dialogues.
        </List.Item>
    </List>
)

const Vision = (
    <p>Our ultimate goal is to evolve into a Decentralized Autonomous Organization (DAO) whereby no centralized decision-making will be required to uphold this service and its founding design principles. The intended offering of this DAO is a locally hosted equivalent of this application, air-gapped from the internet and capable of running on consumer-grade hardware. So a Library of Alexandria with a superintelligent librarian in your pocket, if you will.</p>
)

const AboutMe = (
    <div>
        <p>Hi, I'm Evan. I’m the kind of person that feels most at home in a good book, but I can almost never find one, which drove me to make this app. Trained in facilities and marine engineering, I swiftly veered towards Internet technologies. My book, Blockchain Wars: The Future of Big Tech Monopolies and the Blockchain Internet, propelled me into startups challenging Big Tech's dominance. With UncensoredGreats, I hope to extend this mission to include Big Tech’s AI Information War. My dream is to build a plant shop with the capacity to feed and heal a community and read all the books I want without ever having to go on the Internet.</p>
        <p>For collaborations or teaming up, drop me a line</p>
        <Button 
            as="a" 
            href="mailto:evan@uncensoredgreats.com" 
            icon labelPosition="right"
        >
            Contact Me
            <Icon name="mail" />
        </Button>
    </div>
)





// Section 2 

const BugsList = (
    <div>
      <p>These are known issues currently being worked on. If you encounter an issue that’s not listed here, feel free to report it on our <a href="https://github.com/evanmcfarland/UncensoredGreatsCore">github</a>.</p>
      <List bulleted>
        <List.Item>Broken Books links</List.Item>
        <List.Item>Granular Authors (re-uploading grecoroman, etc., corpi, and passing all)</List.Item>
        <List.Item>Inconsistent chat mounting and unmounting</List.Item>
        <List.Item>Lexrank summarizer adds a period at the end</List.Item>
        <List.Item>Individual Author Search only returns one result.</List.Item>
        <List.Item>Should land on theGreats or TimelessMedia page if already signed in.</List.Item>
        <List.Item>Caching for session settings and general memory.</List.Item>
      </List>
    </div>
  );





// Section 3

const FeatureList = (
    <div>
      <p>These are features currently under development. If you’d like to request a new feature, feel free to reach out to <a href="mailto:evan@uncensoredgreats.com">evan@uncensoredgreats.com</a> or on our <a href="https://github.com/evanmcfarland/UncensoredGreatsCore">github</a>.</p>
      <List bulleted>
        <List.Item>Starred Library Part</List.Item>
        <List.Item>Need to Switch Corpi Right on the chatpage</List.Item>
        <List.Item>Author/Corpi Selection for Semantic Library</List.Item>
        <List.Item>Filtering by author on semanticlibrary should also filter books.</List.Item>
        <List.Item>Affordable summarizer.</List.Item>
        <List.Item>Select the amount of sources returned on SemanticLibrary</List.Item>
        <List.Item>Cover images on source-card back</List.Item>
        <List.Item>Book images need compression</List.Item>
      </List>
    </div>
  );





// Construct panels for "About UncensoredGreats"
const aboutUncensoredGreatsPanels = [
  { key: 'just-get-started', title: 'Just Get Started', content: { content: JustGetStarted } },
  { key: 'mission', title: 'Mission', content: { content: Mission } },
  { key: 'terms-of-service', title: 'Terms of Service', content: { content: TermsOfService } },
  { key: 'why', title: 'The Why', content: { content: Why } },
  { key: 'how', title: 'The How', content: { content: How } },
  { key: 'vision', title: 'The Vision', content: { content: Vision } },
  { key: 'about-me', title: 'About Me', content: { content: AboutMe } },
];

// Construct the main panels for different levels
const mainPanels = [
  { key: 'about-uncensoredgreats', title: 'About UncensoredGreats', content: { content: <Accordion panels={aboutUncensoredGreatsPanels} styled /> } },
  { key: 'dev-info', title: 'Reporting Bugs', content: { content: BugsList } },
  { key: 'feature-info', title: 'Upcoming Features', content: { content: FeatureList } },
  { key: 'source-info', title: 'Author Source Details', content: { content: 'Coming very shortly, like within 24 hours.' } },
];

function AboutPage() {
  return (
    <Layout>
      <Container text style={{ paddingTop: '2em' }}>
        <Header as='h1'>Everything About Us</Header>
        <Accordion defaultActiveIndex={0} panels={mainPanels} styled />
      </Container>
    </Layout>
  );
}

export default AboutPage;
