import React, { useState } from 'react';
import './Remedies.css';

const Remedies = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItem, setExpandedItem] = useState(null);

  const remedyCategories = [
    { id: 'all', name: 'All Diagnoses' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'respiratory', name: 'Respiratory' },
    { id: 'gastrointestinal', name: 'Gastrointestinal' },
    { id: 'infectious', name: 'Infectious Diseases' }
  ];

  const remedies = [
    // Cardiology (6 entries)
    {
      id: 1,
      category: 'cardiology',
      title: 'Hypertension Evaluation',
      description: 'Evaluation for high blood pressure involves checking your blood pressure readings, assessing lifestyle factors, and reviewing family history. Early diagnosis is key to effective management.',
      steps: [
        'Measure blood pressure using an automated monitor or manual sphygmomanometer',
        'Record multiple readings over several days for accuracy',
        'Assess lifestyle factors including diet, exercise, and stress',
        'Consult with a healthcare provider for further testing if needed'
      ],
      precautions: 'Avoid caffeine or exercise 30 minutes prior to measurement. Follow device instructions carefully.',
      videoId: 'hypertensionEval1',
      videoTitle: 'How to Accurately Measure Blood Pressure',
      videoLink: 'https://youtu.be/sampleHypertensionVideo'
    },
    {
      id: 2,
      category: 'cardiology',
      title: 'Coronary Artery Disease Assessment',
      description: 'Assessment for coronary artery disease involves evaluating risk factors, conducting stress tests, and analyzing imaging studies to detect blockages in the coronary arteries.',
      steps: [
        'Review patient history for risk factors like smoking and diabetes',
        'Conduct a treadmill stress test',
        'Perform an electrocardiogram (ECG) to monitor heart activity',
        'Follow up with imaging tests such as a coronary CT angiography'
      ],
      precautions: 'Ensure proper patient preparation for stress tests. Consider contraindications for imaging procedures.',
      videoId: 'cadAssessment2',
      videoTitle: 'Understanding Coronary Artery Disease',
      videoLink: 'https://youtu.be/sampleCADVideo'
    },
    {
      id: 3,
      category: 'cardiology',
      title: 'Arrhythmia Detection',
      description: 'Detecting arrhythmias involves monitoring the heart rhythm using ECG, Holter monitors, and sometimes implantable devices to identify abnormal heartbeats.',
      steps: [
        'Conduct a standard electrocardiogram (ECG)',
        'Use a Holter monitor for continuous 24-48 hour recording',
        'Consider an event recorder if episodes are infrequent',
        'Review patient symptoms and medical history for triggers'
      ],
      precautions: 'Be aware of factors that may interfere with readings, such as movement or stress. Follow device instructions closely.',
      videoId: 'arrhythmiaDetect3',
      videoTitle: 'Arrhythmia Detection Techniques',
      videoLink: 'https://youtu.be/sampleArrhythmiaVideo'
    },
    {
      id: 4,
      category: 'cardiology',
      title: 'Heart Failure Screening',
      description: 'Screening for heart failure includes evaluating symptoms, performing imaging studies, and blood tests to assess the heart’s pumping efficiency.',
      steps: [
        'Take a detailed history and conduct a physical exam',
        'Perform an echocardiogram to visualize heart function',
        'Conduct blood tests for BNP (B-type natriuretic peptide) levels',
        'Evaluate lifestyle factors and adjust medications as needed'
      ],
      precautions: 'Screening methods should be chosen based on patient risk factors. Consult specialists for complex cases.',
      videoId: 'heartFailureScreen4',
      videoTitle: 'Heart Failure Screening and Management',
      videoLink: 'https://youtu.be/sampleHeartFailureVideo'
    },
    {
      id: 21,
      category: 'cardiology',
      title: 'Valvular Heart Disease Screening',
      description: 'Screening for valvular heart disease involves auscultation, echocardiography, and evaluation of symptoms such as shortness of breath or fatigue.',
      steps: [
        'Perform a thorough cardiac auscultation for murmurs',
        'Conduct an echocardiogram to assess valve function',
        'Review patient symptoms and history for potential valve issues',
        'Consider further imaging if abnormalities are detected'
      ],
      precautions: 'Ensure proper technique during auscultation. Refer to a specialist if significant abnormalities are found.',
      videoId: 'valvularScreen21',
      videoTitle: 'Valvular Heart Disease Overview',
      videoLink: 'https://youtu.be/sampleValvularVideo'
    },
    {
      id: 22,
      category: 'cardiology',
      title: 'Pericarditis Evaluation',
      description: 'Evaluation for pericarditis includes checking for chest pain, friction rubs on examination, and diagnostic imaging to identify inflammation around the heart.',
      steps: [
        'Assess for chest pain that worsens when lying down',
        'Listen for a pericardial friction rub during auscultation',
        'Order an echocardiogram to detect fluid around the heart',
        'Review inflammatory markers in blood tests'
      ],
      precautions: 'Monitor for signs of cardiac tamponade. Consult with a cardiologist for abnormal findings.',
      videoId: 'pericarditisEval22',
      videoTitle: 'Diagnosing Pericarditis',
      videoLink: 'https://youtu.be/samplePericarditisVideo'
    },

    // Neurology (6 entries)
    {
      id: 5,
      category: 'neurology',
      title: 'Migraine Diagnosis',
      description: 'Diagnosing migraines involves a thorough review of symptoms, triggers, and family history. A headache diary can be useful in tracking frequency and intensity.',
      steps: [
        'Maintain a headache diary detailing symptoms, triggers, and duration',
        'Conduct a neurological examination',
        'Consider imaging tests (MRI or CT) if necessary',
        'Review family history and potential trigger factors'
      ],
      precautions: 'Ensure that the diary is accurate and comprehensive. Consult with a specialist for persistent symptoms.',
      videoId: 'migraineDiag5',
      videoTitle: 'Understanding Migraine Diagnosis',
      videoLink: 'https://youtu.be/sampleMigraineVideo'
    },
    {
      id: 6,
      category: 'neurology',
      title: 'Epilepsy Evaluation',
      description: 'Evaluation for epilepsy includes a detailed seizure history, EEG monitoring, and imaging studies to identify abnormal brain activity.',
      steps: [
        'Document detailed descriptions of seizure episodes',
        'Perform an electroencephalogram (EEG) to record brain waves',
        'Consider video-EEG monitoring for better accuracy',
        'Obtain brain imaging (MRI or CT) to rule out structural causes'
      ],
      precautions: 'Ensure a safe environment during prolonged monitoring. Follow neurologist recommendations for further testing.',
      videoId: 'epilepsyEval6',
      videoTitle: 'Epilepsy Diagnosis Explained',
      videoLink: 'https://youtu.be/sampleEpilepsyVideo'
    },
    {
      id: 7,
      category: 'neurology',
      title: 'Stroke Risk Assessment',
      description: 'Assessing stroke risk involves evaluating blood pressure, cholesterol levels, and lifestyle factors, as well as using scoring systems to predict risk.',
      steps: [
        'Evaluate patient history for previous stroke or TIA events',
        'Measure blood pressure and cholesterol levels',
        'Use scoring systems like the CHA₂DS₂-VASc score',
        'Recommend lifestyle modifications and preventive medications'
      ],
      precautions: 'Risk assessments should be individualized. Monitor patients closely if they are at high risk.',
      videoId: 'strokeRisk7',
      videoTitle: 'Stroke Risk Assessment Methods',
      videoLink: 'https://youtu.be/sampleStrokeRiskVideo'
    },
    {
      id: 8,
      category: 'neurology',
      title: 'Peripheral Neuropathy Examination',
      description: 'Examination for peripheral neuropathy includes assessing nerve function through physical tests, reflex assessments, and nerve conduction studies.',
      steps: [
        'Perform a physical exam focusing on sensory and motor functions',
        'Test deep tendon reflexes and light touch sensitivity',
        'Conduct nerve conduction studies if indicated',
        'Review medical history for diabetes or vitamin deficiencies'
      ],
      precautions: 'Consider patient comfort during nerve conduction studies. Interpret results in context with clinical findings.',
      videoId: 'neuropathyExam8',
      videoTitle: 'Peripheral Neuropathy: Diagnosis and Testing',
      videoLink: 'https://youtu.be/sampleNeuropathyVideo'
    },
    {
      id: 23,
      category: 'neurology',
      title: 'Multiple Sclerosis Diagnosis',
      description: 'Diagnosis of multiple sclerosis involves neurological examination, MRI imaging to detect lesions, and analysis of cerebrospinal fluid.',
      steps: [
        'Perform a detailed neurological exam',
        'Obtain an MRI to look for demyelinating lesions',
        'Conduct a lumbar puncture to analyze cerebrospinal fluid',
        'Review clinical history for relapsing and remitting symptoms'
      ],
      precautions: 'Ensure proper patient preparation for lumbar puncture. Follow up on inconclusive imaging results.',
      videoId: 'msDiag23',
      videoTitle: 'Multiple Sclerosis Diagnosis Overview',
      videoLink: 'https://youtu.be/sampleMSVideo'
    },
    {
      id: 24,
      category: 'neurology',
      title: 'Parkinson\'s Disease Assessment',
      description: 'Assessment for Parkinson’s Disease includes evaluating motor symptoms, tremors, and using clinical scales to measure disease progression.',
      steps: [
        'Conduct a detailed motor examination for tremors and rigidity',
        'Utilize the Unified Parkinson’s Disease Rating Scale (UPDRS)',
        'Review patient history for gradual onset of symptoms',
        'Consider dopamine transporter imaging if needed'
      ],
      precautions: 'Monitor changes in motor function over time. Consult a neurologist for complex cases.',
      videoId: 'parkinsonsDiag24',
      videoTitle: 'Assessing Parkinson’s Disease',
      videoLink: 'https://youtu.be/sampleParkinsonsVideo'
    },

    // Respiratory (6 entries)
    {
      id: 9,
      category: 'respiratory',
      title: 'Asthma Assessment',
      description: 'Asthma diagnosis is based on clinical evaluation and lung function tests. This assessment helps determine the severity of your condition and guide treatment decisions.',
      steps: [
        'Discuss your symptoms and medical history with your doctor',
        'Perform a spirometry test to assess lung function',
        'Monitor peak expiratory flow rates over time',
        'Evaluate for potential allergic triggers'
      ],
      precautions: 'Avoid exposure to known allergens prior to testing. Follow your physician’s recommendations closely.',
      videoId: 'asthmaAssess9',
      videoTitle: 'Asthma Assessment and Management',
      videoLink: 'https://youtu.be/sampleAsthmaVideo'
    },
    {
      id: 10,
      category: 'respiratory',
      title: 'COPD Diagnosis',
      description: 'Diagnosis of Chronic Obstructive Pulmonary Disease (COPD) involves spirometry tests, symptom evaluation, and assessment of risk factors such as smoking history.',
      steps: [
        'Conduct spirometry to measure lung function',
        'Evaluate patient history, especially smoking habits',
        'Assess for chronic cough and sputum production',
        'Review imaging studies if necessary'
      ],
      precautions: 'Ensure proper technique during spirometry. Consider supplemental oxygen testing in advanced cases.',
      videoId: 'copdDiagnosis10',
      videoTitle: 'Diagnosing COPD Effectively',
      videoLink: 'https://youtu.be/sampleCOPDVideo'
    },
    {
      id: 11,
      category: 'respiratory',
      title: 'Allergic Rhinitis Evaluation',
      description: 'Evaluation for allergic rhinitis focuses on identifying allergen triggers through patient history, skin tests, and nasal examinations.',
      steps: [
        'Document symptoms such as sneezing, nasal congestion, and runny nose',
        'Conduct skin prick tests to identify allergens',
        'Perform a nasal endoscopy if needed',
        'Recommend environmental modifications and medication trials'
      ],
      precautions: 'Test in a controlled environment. Consider cross-reactivity in allergen testing.',
      videoId: 'rhinitisEval11',
      videoTitle: 'Allergic Rhinitis Diagnosis and Management',
      videoLink: 'https://youtu.be/sampleRhinitisVideo'
    },
    {
      id: 12,
      category: 'respiratory',
      title: 'Sleep Apnea Screening',
      description: 'Screening for sleep apnea involves evaluating symptoms like snoring and daytime fatigue, followed by sleep studies to assess breathing patterns during sleep.',
      steps: [
        'Review patient-reported symptoms and sleep habits',
        'Conduct an overnight polysomnography study',
        'Measure oxygen saturation levels during sleep',
        'Assess for underlying risk factors such as obesity'
      ],
      precautions: 'Ensure a proper sleep study setup. Follow-up on borderline cases with additional tests if necessary.',
      videoId: 'sleepApnea12',
      videoTitle: 'Screening for Sleep Apnea',
      videoLink: 'https://youtu.be/sampleSleepApneaVideo'
    },
    {
      id: 25,
      category: 'respiratory',
      title: 'Pulmonary Fibrosis Screening',
      description: 'Screening for pulmonary fibrosis includes evaluating lung function, imaging studies, and assessing for environmental exposures that could lead to scarring of lung tissue.',
      steps: [
        'Conduct pulmonary function tests (PFTs) to assess lung capacity',
        'Obtain a high-resolution CT scan of the chest',
        'Review patient history for exposure to fibrogenic dusts or toxins',
        'Monitor oxygen levels and exercise tolerance'
      ],
      precautions: 'Ensure imaging is interpreted by experienced radiologists. Monitor progression over time.',
      videoId: 'fibrosisScreen25',
      videoTitle: 'Pulmonary Fibrosis: Diagnosis and Management',
      videoLink: 'https://youtu.be/sampleFibrosisVideo'
    },
    {
      id: 26,
      category: 'respiratory',
      title: 'Bronchitis Diagnosis',
      description: 'Diagnosis of bronchitis focuses on evaluating symptoms, conducting physical examinations, and using imaging studies to rule out pneumonia.',
      steps: [
        'Evaluate for persistent cough and sputum production',
        'Conduct a chest X-ray to rule out pneumonia',
        'Assess for signs of inflammation in the airways',
        'Review patient history for exposure to irritants'
      ],
      precautions: 'Differentiate between acute and chronic bronchitis. Follow up if symptoms worsen or persist.',
      videoId: 'bronchitisDiag26',
      videoTitle: 'Diagnosing Bronchitis',
      videoLink: 'https://youtu.be/sampleBronchitisVideo'
    },

    // Gastrointestinal (6 entries)
    {
      id: 13,
      category: 'gastrointestinal',
      title: 'GERD Assessment',
      description: 'Gastroesophageal reflux disease (GERD) assessment includes evaluating symptoms of heartburn, acid regurgitation, and discomfort, along with endoscopic examinations if needed.',
      steps: [
        'Record frequency and severity of heartburn episodes',
        'Recommend lifestyle modifications and dietary changes',
        'Perform an endoscopy to inspect the esophagus',
        'Consider pH monitoring for acid reflux measurement'
      ],
      precautions: 'Avoid heavy meals before testing. Follow up with a gastroenterologist for severe cases.',
      videoId: 'gerdAssess13',
      videoTitle: 'Understanding GERD Diagnosis',
      videoLink: 'https://youtu.be/sampleGERDVideo'
    },
    {
      id: 14,
      category: 'gastrointestinal',
      title: 'IBS Diagnosis',
      description: 'Irritable Bowel Syndrome (IBS) diagnosis is primarily based on symptom patterns, dietary triggers, and exclusion of other conditions through testing.',
      steps: [
        'Document bowel habits and abdominal discomfort',
        'Review dietary patterns for trigger foods',
        'Conduct blood tests and stool studies to rule out infections',
        'Use Rome IV criteria to support the diagnosis'
      ],
      precautions: 'IBS is a diagnosis of exclusion. Always rule out other gastrointestinal disorders.',
      videoId: 'ibsDiag14',
      videoTitle: 'Diagnosing Irritable Bowel Syndrome',
      videoLink: 'https://youtu.be/sampleIBSVideo'
    },
    {
      id: 15,
      category: 'gastrointestinal',
      title: 'IBD Screening',
      description: 'Screening for Inflammatory Bowel Disease (IBD) involves a combination of blood tests, stool studies, and imaging or endoscopic examinations to identify intestinal inflammation.',
      steps: [
        'Obtain a detailed history of gastrointestinal symptoms',
        'Perform blood tests for inflammatory markers',
        'Conduct a colonoscopy or sigmoidoscopy as needed',
        'Review imaging studies for intestinal abnormalities'
      ],
      precautions: 'Screening should be tailored to patient history. Invasive procedures require proper preparation and recovery time.',
      videoId: 'ibdScreen15',
      videoTitle: 'Screening for Inflammatory Bowel Disease',
      videoLink: 'https://youtu.be/sampleIBDVideo'
    },
    {
      id: 16,
      category: 'gastrointestinal',
      title: 'Peptic Ulcer Disease Evaluation',
      description: 'Evaluation for peptic ulcer disease involves assessing symptoms, testing for Helicobacter pylori infection, and conducting endoscopic examinations to detect ulcers.',
      steps: [
        'Document symptoms such as stomach pain and bloating',
        'Test for H. pylori using breath or stool tests',
        'Conduct an endoscopy to visualize the stomach lining',
        'Review medication history for NSAID usage'
      ],
      precautions: 'Avoid using proton pump inhibitors before H. pylori testing. Follow gastroenterologist guidance for invasive tests.',
      videoId: 'pudEval16',
      videoTitle: 'Peptic Ulcer Disease: Diagnosis and Management',
      videoLink: 'https://youtu.be/samplePUDVideo'
    },
    {
      id: 27,
      category: 'gastrointestinal',
      title: 'Gallbladder Disease Evaluation',
      description: 'Evaluation for gallbladder disease includes ultrasound imaging, liver function tests, and assessment of pain patterns to determine the presence of gallstones or cholecystitis.',
      steps: [
        'Conduct an abdominal ultrasound to inspect the gallbladder',
        'Perform liver function tests',
        'Evaluate symptoms such as right upper quadrant pain',
        'Review patient history for risk factors like obesity'
      ],
      precautions: 'Ensure imaging is performed by experienced technicians. Consult a specialist for abnormal test results.',
      videoId: 'gallbladderEval27',
      videoTitle: 'Gallbladder Disease Evaluation',
      videoLink: 'https://youtu.be/sampleGallbladderVideo'
    },
    {
      id: 28,
      category: 'gastrointestinal',
      title: 'Celiac Disease Screening',
      description: 'Screening for celiac disease involves blood tests for specific antibodies, followed by an intestinal biopsy if necessary, to confirm gluten sensitivity.',
      steps: [
        'Conduct blood tests for anti-tissue transglutaminase (tTG) antibodies',
        'Review dietary history regarding gluten consumption',
        'Perform an endoscopic biopsy of the small intestine if indicated',
        'Confirm diagnosis with clinical correlation'
      ],
      precautions: 'Patients should be consuming gluten prior to testing. Follow up with dietary consultation if diagnosed.',
      videoId: 'celiacScreen28',
      videoTitle: 'Celiac Disease Diagnosis Explained',
      videoLink: 'https://youtu.be/sampleCeliacVideo'
    },

    // Infectious Diseases (6 entries)
    {
      id: 17,
      category: 'infectious',
      title: 'COVID-19 Diagnostic Testing',
      description: 'COVID-19 diagnosis can involve a combination of symptom assessment, PCR testing, and rapid antigen tests. Accurate testing and early detection are vital for preventing spread.',
      steps: [
        'Identify symptoms such as fever, cough, and loss of taste or smell',
        'Get tested using a PCR or rapid antigen test',
        'Follow isolation guidelines if positive',
        'Seek medical advice if symptoms worsen'
      ],
      precautions: 'Follow local health guidelines regarding testing and isolation. Consult healthcare providers for advice on managing symptoms.',
      videoId: 'covidTest17',
      videoTitle: 'Understanding COVID-19 Testing',
      videoLink: 'https://youtu.be/sampleCovidVideo'
    },
    {
      id: 18,
      category: 'infectious',
      title: 'Influenza Diagnosis',
      description: 'Influenza diagnosis typically involves symptom evaluation, rapid antigen testing, and in some cases, confirmatory PCR tests to identify the flu virus.',
      steps: [
        'Evaluate symptoms such as fever, body aches, and fatigue',
        'Perform a rapid influenza diagnostic test (RIDT)',
        'Consider a PCR test for confirmation in severe cases',
        'Advise on antiviral medications if indicated'
      ],
      precautions: 'Rapid tests may yield false negatives; follow up with confirmatory tests when needed.',
      videoId: 'fluDiag18',
      videoTitle: 'Influenza Diagnosis and Treatment',
      videoLink: 'https://youtu.be/sampleFluVideo'
    },
    {
      id: 19,
      category: 'infectious',
      title: 'Tuberculosis Screening',
      description: 'Tuberculosis (TB) screening involves a skin or blood test followed by a chest X-ray if initial tests are positive, to determine active or latent infection.',
      steps: [
        'Conduct a Mantoux tuberculin skin test (TST) or IGRA blood test',
        'If positive, perform a chest X-ray for further evaluation',
        'Review patient history for TB exposure risk',
        'Consult with an infectious disease specialist for treatment options'
      ],
      precautions: 'Interpret test results in conjunction with patient history. Follow CDC guidelines for TB screening and management.',
      videoId: 'tbScreen19',
      videoTitle: 'Tuberculosis Screening Explained',
      videoLink: 'https://youtu.be/sampleTBVideo'
    },
    {
      id: 20,
      category: 'infectious',
      title: 'Urinary Tract Infection (UTI) Assessment',
      description: 'UTI assessment includes evaluating symptoms, performing a urine analysis, and in some cases, urine culture to identify the infection and appropriate antibiotic treatment.',
      steps: [
        'Review symptoms such as burning during urination and frequent urges',
        'Collect a midstream urine sample for analysis',
        'Perform a urine dipstick test followed by laboratory culture if needed',
        'Determine appropriate antibiotic treatment based on culture results'
      ],
      precautions: 'Ensure proper sample collection to avoid contamination. Follow up with additional tests if symptoms persist.',
      videoId: 'utiAssess20',
      videoTitle: 'Diagnosing Urinary Tract Infections',
      videoLink: 'https://youtu.be/sampleUTIVideo'
    },
    {
      id: 29,
      category: 'infectious',
      title: 'Hepatitis Testing',
      description: 'Hepatitis testing involves blood tests to detect viral antigens and antibodies, helping to diagnose and differentiate between various types of hepatitis infections.',
      steps: [
        'Perform blood tests for hepatitis A, B, and C markers',
        'Review patient history and risk factors for viral exposure',
        'Interpret antigen and antibody test results',
        'Consult with a specialist for confirmed cases'
      ],
      precautions: 'Ensure proper handling of blood samples. Follow up with confirmatory tests if needed.',
      videoId: 'hepatitisTest29',
      videoTitle: 'Understanding Hepatitis Testing',
      videoLink: 'https://youtu.be/sampleHepatitisVideo'
    },
    {
      id: 30,
      category: 'infectious',
      title: 'STI Assessment',
      description: 'Sexually transmitted infection (STI) assessment involves evaluating symptoms, taking a detailed sexual history, and performing specific tests to diagnose infections like chlamydia, gonorrhea, and syphilis.',
      steps: [
        'Conduct a detailed sexual history and symptom review',
        'Perform swab tests or blood tests as appropriate',
        'Review test results with a healthcare provider',
        'Initiate treatment and counseling if an infection is detected'
      ],
      precautions: 'Maintain confidentiality and proper sample collection. Follow up with partner notification as necessary.',
      videoId: 'stiAssess30',
      videoTitle: 'STI Assessment and Diagnosis',
      videoLink: 'https://youtu.be/sampleSTIVideo'
    }
  ];

  const filteredRemedies = activeCategory === 'all'
    ? remedies
    : remedies.filter(item => item.category === activeCategory);

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="remedies-container">
      <h1>Medical Diagnosis Portal</h1>
      <p className="remedies-intro">
        Explore these diagnostic guidelines and evaluation procedures for various medical conditions.
        Each diagnosis includes step-by-step evaluation methods and helpful video tutorials.
      </p>

      <div className="remedies-categories">
        {remedyCategories.map(category => (
          <button 
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="remedies-grid">
        {filteredRemedies.map(item => (
          <div key={item.id} className="remedy-card">
            <div className="remedy-header">
              <h2>{item.title}</h2>
              <span className="remedy-category-tag">
                {remedyCategories.find(cat => cat.id === item.category).name}
              </span>
            </div>
            
            <p className="remedy-description">{item.description}</p>
            
            <button 
              className="view-details-button"
              onClick={() => toggleItem(item.id)}
            >
              {expandedItem === item.id ? 'Hide Details' : 'View Details'}
            </button>
            
            {expandedItem === item.id && (
              <div className="remedy-details">
                <div className="remedy-steps">
                  <h3>Diagnostic Steps:</h3>
                  <ol>
                    {item.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="remedy-precautions">
                  <h3>Important Considerations:</h3>
                  <p>{item.precautions}</p>
                </div>
                
                <div className="remedy-video">
                  <h3>Watch Tutorial:</h3>
                  <div className="video-container">
                    <div className="video-placeholder">
                      <div className="video-info">
                        <span className="video-title">{item.videoTitle}</span>
                        <a 
                          href={item.videoLink}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="watch-button"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="remedy-disclaimer">
        <h3>Important Note:</h3>
        <p>
          This portal is intended for informational purposes only and does not substitute for professional medical advice.
          If you experience concerning symptoms or require a diagnosis, please consult a qualified healthcare provider.
        </p>
      </div>
    </div>
  );
};

export default Remedies;
