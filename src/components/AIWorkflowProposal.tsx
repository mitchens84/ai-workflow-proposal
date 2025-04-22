import { ArrowUp, Menu, Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AIWorkflowProposal = () => {
  const [expandedSections, setExpandedSections] = useState({
    'overview': false,
    'problem': false,
    'goals': false,
    'metrics': false,
    'graphic-design': false,
    'content-brief': false,
    'case-management': false,
    'listings-upload': false,
    'knowledge': false,
    'capability-assessment': false,
    'implementation': false,
    'references': false
  });
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        setShowScrollTop(true);
      } else {
        setIsScrolled(false);
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleTabClick = (tab) => {
    setExpandedSections({
      ...expandedSections,
      [tab]: true
    });

    // Scroll to the section
    if (sectionRefs.current[tab]) {
      sectionRefs.current[tab].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to filter workflow data based on search term
  const filterWorkflowData = (data, term) => {
    if (!term) return data;

    return data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // Table data for the different workflow sections
  const graphicDesignWorkflow = [
    { phase: '1. Ideation', task: 'Generate visual angles', description: 'Creating concepts for lifestyle shots, feature zoom-ins, use cases, and application scenarios', aiRole: 'Generate structured creative concepts based on product specifications and brand guidelines¹', humanRole: 'Review hooks, remove irrelevant ones, combine ideas', tools: 'Claude 3.7' },
    { phase: '1. Ideation', task: 'Brainstorm layout types', description: 'Developing 3-icon layouts, side-by-side comparisons, and storytelling flows', aiRole: 'Suggest layout options optimized for Amazon marketplace presentation', humanRole: 'Approve, customize to brand tone', tools: 'Claude 3.7' },
    { phase: '2. Brand Profile Structuring', task: 'Analyze previous visuals', description: 'Examining existing imagery to extract tone, layout patterns, and iconography style', aiRole: 'Review image dataset, identify brand tone & visual consistency rules⁴', humanRole: 'Reviews and confirms profile', tools: 'GPT-4o + PKM Tool (Suggested G-Doc)' },
    { phase: '2. Base Image Generation', task: 'Generate product cutout', description: 'Creating isolated product images on neutral backgrounds for versatile use', aiRole: 'Create high-quality product isolation with brand-aligned presentation', humanRole: 'Final crop/resize, refine lighting', tools: 'GPT-4o + PS' },
    { phase: '2. Base Image Generation', task: 'Generate lifestyle mockups', description: 'Creating contextual imagery (e.g kitchen, outdoor, hands using product)', aiRole: 'Generate realistic lifestyle contexts showing product in use⁴', humanRole: 'Discard unrealistic samples, layer brand assets', tools: 'GPT-4o' },
    { phase: '3. Image Refinement', task: 'Background removal/rendering', description: 'Isolating product from backgrounds or creating professional renderings', aiRole: 'Perform object isolation, handle translucent edges, retain fine outlines', humanRole: 'Check isolation quality, fix any edge artifacts', tools: 'GPT-4o + PS' },
    { phase: '3. Image Refinement', task: 'Lighting correction', description: 'Enhancing lighting and shadows for professional product presentation', aiRole: 'Suggest lighting gradients and shadow angles using references', humanRole: 'Verify realism of shadows, adjust depth if needed', tools: 'GPT-4o + PS' },
    { phase: '3. Image Refinement', task: 'Edge smoothing', description: 'Optimizing object edges and anti-aliasing for professional appearance', aiRole: 'Improve jagged edges via vision-based instructions or inpainting techniques', humanRole: 'Check pixel smoothness manually on curves/logos', tools: 'GPT-4o + PS/Canva' },
    { phase: '3. Image Refinement', task: 'Infographic element generation', description: 'Creating icons, visual callouts, and text overlays for product highlights', aiRole: 'Propose visual composition logic with supportive graphic elements', humanRole: 'Designer curates visual elements, validates design match and narrative strength', tools: 'GPT-4o' },
    { phase: '3. Image Refinement', task: 'Color correction', description: 'Ensuring accurate color representation of product', aiRole: 'Match product color profile using reference images and lighting adaptation⁴', humanRole: 'Ensure accurate color tone (especially packaging)', tools: 'GPT-4o + PS' },
    { phase: '3. Image Refinement', task: 'Product compositing', description: 'Placing real product images into AI-generated contextual backgrounds', aiRole: 'Place masked real product into rendered environments with proper composition', humanRole: 'Review composition to ensure believability', tools: 'GPT-4o' },
    { phase: '3. Image Refinement', task: 'Format conversion & cropping', description: 'Preparing final files to meet Amazon gallery specifications', aiRole: 'Export to Amazon-compliant size/ratio with appropriate parameters', humanRole: 'Final review of resolution, format, and export compliance', tools: 'GPT-4o + PS' },
    { phase: '4. Infographic Composition', task: 'Infographic layout design', description: 'Creating visual hierarchies for complex product information displays', aiRole: 'Propose visual hierarchy and element groupings based on product benefit themes', humanRole: 'Evaluates and rebuilds for brand fit', tools: 'GPT-4o' },
    { phase: '4. Copy Integration', task: 'Value proposition text', description: 'Creating compelling text overlays highlighting key benefits', aiRole: 'Generate benefit-focused text with brand-appropriate tone²', humanRole: 'Tweaks for clarity + compliance', tools: 'GPT-4o' },
    { phase: '4. Copy Integration', task: 'Packaging callouts', description: 'Creating short, impactful text for packaging highlights', aiRole: 'Generate concise benefit statements and feature highlights', humanRole: 'Select & refine phrasing', tools: 'Claude 3.7' },
    { phase: '5. QA & Review', task: 'Layout/Brand consistency verification', description: 'Checking alignment, grid structure, and visual consistency with brand guidelines', aiRole: 'Audit based on preset parameters and flag mis-alignment', humanRole: 'Refines & Validates', tools: 'Claude 3.7' },
    { phase: '5. QA & Review', task: 'Compliance check', description: 'Verifying text size, claim wording, and Amazon policy compliance', aiRole: 'Audit based on preset knowledge and flag mis-alignment¹⁷', humanRole: 'Reviews & Verifies', tools: 'Claude 3.7' }
  ];

  const contentBriefWorkflow = [
    { phase: 'Product Context Framing', task: 'Product feature analysis', description: 'Compiling product features, use cases, materials, and keywords into coherent profile', aiRole: 'Analyze product listing, reviews, and internal docs to generate "Creative Source Profile"¹', humanRole: 'Approves/edits product summary, add launch notes', tools: 'Claude 3.7' },
    { phase: 'Gallery Brief Generation', task: 'Layout sequence planning', description: 'Creating optimized image flow (Hero → Features → Story → Social Proof)', aiRole: 'Propose 5–7 image ideas with callout suggestions and Amazon-optimized sequencing', humanRole: 'Selects best flow, edits weak ideas', tools: 'Claude 3.7' },
    { phase: 'A+ Content Planning', task: 'Modular layout design', description: 'Creating brand story, feature sets, lifestyle imagery, and CTA structure', aiRole: 'Generate multiple structures with text snippets and image-role suggestions', humanRole: 'Finalizes based on template availability', tools: 'Claude 3.7 + GPT-4o' },
    { phase: 'Storefront Narrative Planning', task: 'Navigation structure development', description: 'Creating section breakdowns, navigation logic, and seasonal banner concepts', aiRole: 'Output a UX-style sitemap and content tone proposal for storefront organization', humanRole: 'Aligns with campaign or brand guideline', tools: 'Claude 3.7' },
    { phase: 'Voice + Copy Drafting', task: 'Brand-aligned text creation', description: 'Generating headlines, benefit overlays, and micro-copy with consistent voice', aiRole: 'Produce tone-specific variants with compliance-safe framing²', humanRole: 'Checks tone, grammar, and legal claims', tools: 'GPT-4o' },
    { phase: 'Feedback Loop Integration', task: 'Performance tracking', description: 'Documenting brief success metrics (CTR, CVR uplift) for continuous improvement', aiRole: 'Summarize patterns from successful briefs to improve future outputs¹³', humanRole: 'Builds learning-based prompt variations', tools: 'Claud 3.7 + PKM Tool (Suggested Airtable)' }
  ];

  const caseWalkthroughData = [
    { stage: 'Product Context Extraction', task: 'Profile generation', description: 'Analysis of existing listing, reviews, and keyword documentation', aiRole: 'Process assets to generate comprehensive product summary¹³', humanRole: 'Confirms or adds audience segments (eco buyers, meal preppers)', output: '"Creative Source Profile"' },
    { stage: 'Gallery Sequence Planning', task: 'Narrative structure development', description: 'Creating storyline progression options for optimal customer engagement', aiRole: 'Propose narrative flows (Feature-led, Lifestyle-first, Brand mission intro)', humanRole: 'Chooses "Feature-Led with Emotional CTA" flow', output: 'Image layout plan (7 slides)' },
    { stage: 'Image Module Planning', task: 'Detailed image content planning', description: 'Sequencing specific product highlights in logical progression', aiRole: 'Output detailed modules (Hero, feature demonstrations, sustainability callouts)', humanRole: 'Approves layout, requests visual reference links', output: 'Draft brief with slide-by-slide instructions' },
    { stage: 'Copy Drafting', task: 'Headline and caption creation', description: 'Generating concise, impactful text for image overlays', aiRole: 'Propose short titles and benefit statements (e.g. "Seals Fresh. Stacks Smart.")', humanRole: 'Refines tone to softer, more minimalist voice', output: 'Caption text for overlay' },
    { stage: 'Final Brief Export', task: 'Document preparation', description: 'Compiling all elements into designer-ready document', aiRole: 'Assemble brief into Google Doc format for the design team', humanRole: 'Reviews for readiness', output: 'Brief sent to designer' }
  ];

  const caseManagementWorkflow = [
    { phase: '1. Intake & Categorization', task: 'Issue classification', description: 'Identifying case type (suspension, listing error, FBA refund, policy appeal)', aiRole: 'Parse intake message and classify into known issue types using template library⁹', humanRole: 'Confirm correct categorization, escalate if needed. *High-level expertise involved', tools: 'GPT 4o' },
    { phase: '2. Case Research', task: 'Precedent identification', description: 'Finding relevant successful case examples and resolution patterns', aiRole: 'Surface relevant examples tagged by resolution type from knowledge base¹³', humanRole: 'Evaluates precedent validity and adjusts argument angle. *High-level expertise involved', tools: 'Claude 3.7 + Airtable' },
    { phase: '3. Drafting & Framing', task: 'Case construction', description: 'Writing case in Amazon\'s preferred tone and structure (issue → evidence → ask)', aiRole: 'Auto-structure draft using known format logic and compliance language¹⁶', humanRole: 'Edits, adds nuance, and fact-checks', tools: 'GPT-4o' },
    { phase: '4. QA & Submission', task: 'Quality assurance', description: 'Validating tone, clarity, and compliance language before submission', aiRole: 'Cross check for compliance and flags mis-alignment¹⁷', humanRole: 'Validates and uploads through Amazon portal', tools: 'GPT-4o' }
  ];

  const listingsUploadWorkflow = [
    { phase: '1. Data Intake', task: 'Product data collection', description: 'Gathering all product details (title, bullets, specs, images, backend fields)', aiRole: 'Parse unstructured data into standardized JSON or tabular format⁷', humanRole: 'Confirm data completeness, add product nuance', tools: 'Gemini 2.5 + Google Sheets' },
    { phase: '2. Template Preparation', task: 'Template retrieval', description: 'Obtaining correct flat file template based on product category', aiRole: 'Automate lookup from Amazon template library', humanRole: 'Download from Seller Central; validate template version', tools: 'Gemini 2.5' },
    { phase: '2. Template Preparation', task: 'Field requirement analysis', description: 'Identifying required and optional fields with specifications', aiRole: 'Outline field priorities per category with compliance requirements⁷', humanRole: 'Confirm field mapping, adjust if needed', tools: 'Gemini 2.5' },
    { phase: '3. Field Mapping', task: 'Attribute alignment', description: 'Matching product data to correct Amazon template fields', aiRole: 'Align extracted values to correct field headers in template structure⁸', humanRole: 'Confirm logic and correct edge-case mappings', tools: 'Gemini 2.5' },
    { phase: '4. Flat File Population', task: 'Data formatting', description: 'Populating template with properly structured product information', aiRole: 'Format data into compatible structure (CSV/Excel/flat file)⁶', humanRole: 'Run test uploads or QA checks for format compliance', tools: 'Gemini 2.5' },
    { phase: '5. QA & Upload', task: 'Listing validation', description: 'Verifying data integrity and Amazon compliance before submission', aiRole: 'Cross-check formatting issues, character limits, etc.¹⁷', humanRole: 'Final validation and submission', tools: 'GPT-4o/ Gemini 2.5' }
  ];

  const knowledgeManagementSystem = [
    { component: 'Structured Knowledge Base', purpose: 'Organize Amazon policies, best practices, and brand guidelines', implementation: 'Claude-indexed Google Drive or other database¹³', benefit: 'Single source of truth for all AI operations' },
    { component: 'AI Project Configuration', purpose: 'Set up dedicated AI projects with specialized training', implementation: 'Project-specific instruction sets with role definitions and specialized knowledge¹⁰', benefit: 'Consistent AI outputs aligned with specific workflow needs' },
    { component: 'Custom Instruction Libraries', purpose: 'Develop standardized prompts for recurring tasks', implementation: 'Task-specific instruction templates with embedded Amazon knowledge¹⁰', benefit: 'Reproducible high-quality results with minimal training' },
    { component: 'Enterprise AI Account Management', purpose: 'Configure shared AI accounts with appropriate permissions', implementation: 'Team accounts with role-based access and activity tracking', benefit: 'Cost-effective AI access with appropriate oversight' },
    { component: 'Performance Tracking', purpose: 'Document successful patterns and outcomes', implementation: 'Airtable database with performance metrics¹⁴', benefit: 'Continuous improvement through data-driven optimization' },
    { component: 'Training Framework', purpose: 'Onboard team members to AI-enhanced workflows', implementation: 'Structured learning modules and hands-on practice', benefit: 'Rapid skill development and consistent implementation' }
  ];

  // For now, we're just returning a placeholder UI
  return (
    <Container>
      <Header isScrolled={isScrolled}>
        <h1>AI-Enhanced Workflow Proposal</h1>
        <SearchBar>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <MenuButton onClick={() => setQuickNavOpen(!quickNavOpen)}>
          {quickNavOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>
      </Header>

      {quickNavOpen && (
        <QuickNav>
          <h3>Quick Navigation</h3>
          <ul>
            <li onClick={() => handleTabClick('graphic-design')}>Graphic Design Workflow</li>
            <li onClick={() => handleTabClick('content-brief')}>Content Brief Workflow</li>
            <li onClick={() => handleTabClick('case-management')}>Case Management Workflow</li>
            <li onClick={() => handleTabClick('listings-upload')}>Listings Upload Workflow</li>
            <li onClick={() => handleTabClick('knowledge')}>Knowledge Management</li>
          </ul>
        </QuickNav>
      )}

      <Section ref={el => sectionRefs.current['graphic-design'] = el}>
        <h2 onClick={() => toggleSection('graphic-design')}>Graphic Design Workflow</h2>
        {expandedSections['graphic-design'] && (
          <>
            <FilterInput
              type="text"
              placeholder="Filter tasks..."
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
            <WorkflowTable>
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>AI Role</th>
                  <th>Human Role</th>
                  <th>Tools</th>
                </tr>
              </thead>
              <tbody>
                {filterWorkflowData(graphicDesignWorkflow, filterTerm).map((item, index) => (
                  <tr key={index}>
                    <td>{item.phase}</td>
                    <td>{item.task}</td>
                    <td>{item.description}</td>
                    <td>{item.aiRole}</td>
                    <td>{item.humanRole}</td>
                    <td>{item.tools}</td>
                  </tr>
                ))}
              </tbody>
            </WorkflowTable>
          </>
        )}
      </Section>

      <Section ref={el => sectionRefs.current['content-brief'] = el}>
        <h2 onClick={() => toggleSection('content-brief')}>Content Brief Workflow</h2>
        {expandedSections['content-brief'] && (
          <WorkflowTable>
            <thead>
              <tr>
                <th>Phase</th>
                <th>Task</th>
                <th>Description</th>
                <th>AI Role</th>
                <th>Human Role</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {contentBriefWorkflow.map((item, index) => (
                <tr key={index}>
                  <td>{item.phase}</td>
                  <td>{item.task}</td>
                  <td>{item.description}</td>
                  <td>{item.aiRole}</td>
                  <td>{item.humanRole}</td>
                  <td>{item.tools}</td>
                </tr>
              ))}
            </tbody>
          </WorkflowTable>
        )}
      </Section>

      {showScrollTop && (
        <ScrollTopButton onClick={scrollToTop}>
          <ArrowUp size={20} />
        </ScrollTopButton>
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Header = styled.header<{ isScrolled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: box-shadow 0.3s ease;

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px 15px;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;

  input {
    border: none;
    background: transparent;
    width: 100%;
    padding: 5px;
    outline: none;
  }
`;

const SearchIcon = styled(Search)`
  width: 18px;
  height: 18px;
  color: #888;
  margin-right: 10px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const MenuIcon = styled(Menu)`
  width: 24px;
  height: 24px;
`;

const CloseIcon = styled(X)`
  width: 24px;
  height: 24px;
`;

const QuickNav = styled.nav`
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 90;

  h3 {
    margin-top: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 10px 0;
    cursor: pointer;

    &:hover {
      color: #0066cc;
    }
  }
`;

const Section = styled.section`
  margin: 30px 0;

  h2 {
    cursor: pointer;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    &:hover {
      color: #0066cc;
    }
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const WorkflowTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f8f8;
    font-weight: 500;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #0066cc;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

export default AIWorkflowProposal;
