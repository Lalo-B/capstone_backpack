from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, Question

q1 = Question(question='What role does the cytoplasm play in prokaryotic cells?',
              answer1='It serves as the site for photosynthesis',
              answer2='It provides structural suppoer to the cell',
              answer3='It acts as a medium for biochemical reacions and houses essential cellular components',
              answer4='It is responsible for the synthesis of ribosomal RNA',
              test_id=1,
              correct_answer='answer3'
              )
q2 = Question(question='What do the terms serovar and serovarieties indicate in the context of bacterial classification?',
              answer1='A classification based on genetic sequencing differences',
              answer2='Variations in bacteria identified by their biochemical properties',
              answer3='Serological distinctions among different strains of bacteria',
              answer4='Differences in bacterial morphology observed under a microscope',
              test_id=1,
              correct_answer='answer3'
              )
q3 = Question(question='Which of the following best describes the primary concern of rickettsiology?',
              answer1='The study of fungi and their interactions with humans',
              answer2='The examination of bacteria transmitted by ticks and lice',
              answer3='The analysis of viruses affecting plant life',
              answer4='The research of prokaryotic cell structures',
              test_id=1,
              correct_answer='answer2'
              )
q4 = Question(question='What distinguishes archaebacteria from other types of bacteria in terms of their habitat?',
              answer1='They thrive in extreme environments like hot springs and salt lakes',
              answer2='They are found exclusively in human intestines',
              answer3='They require oxygen for growth',
              answer4='They are commonly found in soil and freshwater',
              test_id=1,
              correct_answer='answer1'
              )
q5 = Question(question='Which of the following best describes the structural components of a Gram positive bacterial cell wall?',
              answer1='A thin layer of peptidoglycan with an outer membrane',
              answer2='A thick layer of peptidoglycan containing teichoic acids',
              answer3='Multiple layers of lipopolysaccharides and proteins',
              answer4='A single layer of phospholipids with no peptidoglycan',
              test_id=1,
              correct_answer='answer2'
              )
q6 = Question(question='What is the significance of biovarieties in the classification of bacteria?',
              answer1='They represent genetic variations within a species',
              answer2='They indicate differences based on biochemical test results',
              answer3='They are used to classify bacteria by their shape',
              answer4='They refer to the environmental adaptations of bacteria',
              test_id=1,
              correct_answer='answer2'
              )
q7 = Question(question='Which of these answers describes phage typing?',
              answer1='Phage typing classifies bacteriophage based on the type of cells they can infect.',
              answer2='Phage typing is a method of classifying bacteriophage based on the type of nucleic acid.',
              answer3='Phage typing helps identify bacterial species and strains, based on the type of bacteriophage they are susceptible to.',
              answer4='Phage typing classifies bacteriophage based on structure.',
              test_id=1,
              correct_answer='answer3'
              )
q8 = Question(question='Which component of the Gram-negative cell wall contains both the "O" antigen and the endotoxin molecule known as Lipid A?',
              answer1='Peptidoglycan layer',
              answer2='Cytoplasmic membrane',
              answer3='Periplasmic space',
              answer4='Outer membrane',
              test_id=1,
              correct_answer='answer4'
              )
q9 = Question(question='Which of the following bacterial genera are known for their absence of a cell wall and the presence of sterols in their membranes?',
              answer1='Escherichia',
              answer2='Mycoplasma',
              answer3='Streptococcus',
              answer4='Bacillus',
              test_id=1,
              correct_answer='answer2'
              )
q10 = Question(question='Which of the following statements accurately describes the role of mesosomes in prokaryotic cells?',
              answer1='Mesosomes are primarily involved in the synthesis of proteins.',
              answer2='Mesosomes function as sites for energy production and assist in DNA segregation during cell division.',
              answer3='Mesosomes are responsible for the formation of the bacterial cell wall.',
              answer4='Mesosomes play a key role in the transport of nutrients across the cell membrane.',
              test_id=1,
              correct_answer='answer2'
              )
q11 = Question(question='Which organ is primarily responsible for the production of insulin?',
               answer1='Liver',
               answer2='Pancreas',
               answer3='Kidneys',
               answer4='Spleen',
               test_id=2,
               correct_answer='answer2'
               )

q12 = Question(question='What is the primary function of the alveoli in the lungs?',
               answer1='To produce mucus',
               answer2='To exchange oxygen and carbon dioxide',
               answer3='To transport blood',
               answer4='To filter air',
               test_id=2,
               correct_answer='answer2'
               )

q13 = Question(question='Which part of the brain is responsible for regulating heart rate and blood pressure?',
               answer1='Cerebrum',
               answer2='Medulla oblongata',
               answer3='Cerebellum',
               answer4='Thalamus',
               test_id=2,
               correct_answer='answer2'
               )

q14 = Question(question='What type of joint is the shoulder joint classified as?',
               answer1='Hinge joint',
               answer2='Ball-and-socket joint',
               answer3='Pivot joint',
               answer4='Saddle joint',
               test_id=2,
               correct_answer='answer2'
               )

q15 = Question(question='Which blood vessels carry oxygenated blood away from the heart?',
               answer1='Veins',
               answer2='Capillaries',
               answer3='Arteries',
               answer4='Venules',
               test_id=2,
               correct_answer='answer3'
               )

q16 = Question(question='What is the functional unit of the kidney?',
               answer1='Nephron',
               answer2='Glomerulus',
               answer3='Nephron loop',
               answer4='Collecting duct',
               test_id=2,
               correct_answer='answer1'
               )

q17 = Question(question='Which structure in the ear is responsible for balance?',
               answer1='Cochlea',
               answer2='Eustachian tube',
               answer3='Semicircular canals',
               answer4='Auricle',
               test_id=2,
               correct_answer='answer3'
               )

q18 = Question(question='What is the primary role of the large intestine?',
               answer1='Nutrient absorption',
               answer2='Water absorption and waste elimination',
               answer3='Digesting proteins',
               answer4='Producing bile',
               test_id=2,
               correct_answer='answer2'
               )

q19 = Question(question='Which hormone regulates metabolism and energy production?',
               answer1='Adrenaline',
               answer2='Insulin',
               answer3='Thyroid hormone',
               answer4='Cortisol',
               test_id=2,
               correct_answer='answer3'
               )

q20 = Question(question='What is the main function of the lymphatic system?',
               answer1='To transport oxygen to cells',
               answer2='To remove waste products from cells',
               answer3='To defend against infections and diseases',
               answer4='To produce hormones',
               test_id=2,
               correct_answer='answer3'
               )
q21 = Question(question='What is the derivative of sin(x)?',
               answer1='cos(x)',
               answer2='-sin(x)',
               answer3='tan(x)',
               answer4='sec(x)',
               test_id=3,
               correct_answer='answer1'
               )

q22 = Question(question='What is the integral of 1/x dx?',
               answer1='ln|x| + C',
               answer2='x + C',
               answer3='1/x + C',
               answer4='e^x + C',
               test_id=3,
               correct_answer='answer1'
               )

q23 = Question(question='What is the limit of (1/x) as x approaches infinity?',
               answer1='0',
               answer2='1',
               answer3='infinity',
               answer4='undefined',
               test_id=3,
               correct_answer='answer1'
               )

q24 = Question(question='What is the Fundamental Theorem of Calculus?',
               answer1='It relates differentiation and integration.',
               answer2='It states that limits do not exist.',
               answer3='It defines continuity.',
               answer4='It provides formulas for finding derivatives.',
               test_id=3,
               correct_answer='answer1'
               )

q25 = Question(question='What is the derivative of e^x?',
               answer1='e^x',
               answer2='xe^(x-1)',
               answer3='ln(x)',
               answer4='0',
               test_id=3,
               correct_answer='answer1'
               )

q26 = Question(question='What is the area under the curve of f(x) = x^2 from x = 0 to x = 2?',
               answer1='2',
               answer2='4/3',
               answer3='8/3',
               answer4='2/3',
               test_id=3,
               correct_answer='answer3'
               )

q27 = Question(question='What is the second derivative of f(x) = x^3?',
               answer1='3x^2',
               answer2='6x',
               answer3='x^3',
               answer4='0',
               test_id=3,
               correct_answer='answer2'
               )

q28 = Question(question='What does the Mean Value Theorem state?',
               answer1='A continuous function must have a point where its derivative is zero.',
               answer2='A function is differentiable at all points.',
               answer3='A continuous function on a closed interval has a maximum and minimum.',
               answer4='A function must be continuous to be differentiable.',
               test_id=3,
               correct_answer='answer1'
               )

q29 = Question(question='What is the derivative of ln(x)?',
               answer1='1/x',
               answer2='x',
               answer3='e^x',
               answer4='ln(x)',
               test_id=3,
               correct_answer='answer1'
               )

q30 = Question(question='What is the integral of cos(x) dx?',
               answer1='sin(x) + C',
               answer2='-sin(x) + C',
               answer3='tan(x) + C',
               answer4='e^x + C',
               test_id=3,
               correct_answer='answer1'
               )
q31 = Question(question='What is the functional group of alcohols?',
               answer1='Aldehyde',
               answer2='Hydroxyl',
               answer3='Carbonyl',
               answer4='Carboxyl',
               test_id=4,
               correct_answer='answer2'
               )

q32 = Question(question='Which of the following is an example of an alkane?',
               answer1='C2H4',
               answer2='C3H8',
               answer3='C2H2',
               answer4='C6H6',
               test_id=4,
               correct_answer='answer2'
               )

q33 = Question(question='What type of reaction occurs when an alkene is converted to an alkane?',
               answer1='Elimination',
               answer2='Substitution',
               answer3='Hydrogenation',
               answer4='Oxidation',
               test_id=4,
               correct_answer='answer3'
               )

q34 = Question(question='What is the IUPAC name for CH3COOH?',
               answer1='Methanol',
               answer2='Acetic acid',
               answer3='Ethanol',
               answer4='Butanoic acid',
               test_id=4,
               correct_answer='answer2'
               )

q35 = Question(question='Which compound is an example of a ketone?',
               answer1='Propyl alcohol',
               answer2='Acetone',
               answer3='Ethanol',
               answer4='Benzaldehyde',
               test_id=4,
               correct_answer='answer2'
               )

q36 = Question(question='What is the general formula for alkenes?',
               answer1='C_nH_(2n)',
               answer2='C_nH_(2n+2)',
               answer3='C_nH_(2n-2)',
               answer4='C_nH_n',
               test_id=4,
               correct_answer='answer1'
               )

q37 = Question(question='Which type of isomerism involves compounds with the same molecular formula but different connectivity?',
               answer1='Geometric isomerism',
               answer2='Structural isomerism',
               answer3='Optical isomerism',
               answer4='Chain isomerism',
               test_id=4,
               correct_answer='answer2'
               )

q38 = Question(question='What is the name of the process used to separate liquid mixtures based on differences in boiling points?',
               answer1='Filtration',
               answer2='Distillation',
               answer3='Chromatography',
               answer4='Sublimation',
               test_id=4,
               correct_answer='answer2'
               )

q39 = Question(question='Which of the following is the strongest acid?',
               answer1='Acetic acid',
               answer2='Hydrochloric acid',
               answer3='Sulfuric acid',
               answer4='Nitric acid',
               test_id=4,
               correct_answer='answer3'
               )

q40 = Question(question='What type of bond is formed between two carbon atoms in an alkane?',
               answer1='Single bond',
               answer2='Double bond',
               answer3='Triple bond',
               answer4='Aromatic bond',
               test_id=4,
               correct_answer='answer1'
               )





def seed_questions():
    db.session.add(q1)
    db.session.add(q2)
    db.session.add(q3)
    db.session.add(q4)
    db.session.add(q5)
    db.session.add(q6)
    db.session.add(q7)
    db.session.add(q8)
    db.session.add(q9)
    db.session.add(q10)
    db.session.add(q11)
    db.session.add(q12)
    db.session.add(q13)
    db.session.add(q14)
    db.session.add(q15)
    db.session.add(q16)
    db.session.add(q17)
    db.session.add(q18)
    db.session.add(q19)
    db.session.add(q20)
    db.session.add(q21)
    db.session.add(q22)
    db.session.add(q23)
    db.session.add(q24)
    db.session.add(q25)
    db.session.add(q26)
    db.session.add(q27)
    db.session.add(q28)
    db.session.add(q29)
    db.session.add(q30)
    db.session.add(q31)
    db.session.add(q32)
    db.session.add(q33)
    db.session.add(q34)
    db.session.add(q35)
    db.session.add(q36)
    db.session.add(q37)
    db.session.add(q38)
    db.session.add(q39)
    db.session.add(q40)


    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
