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


# q2 = Question(question='',
#               answer1='',
#               answer2='',
#               answer3='',
#               answer4='',
#               test_id=1,
#               correct_answer=''
#               )
# q2 = Question(question='',
#               answer1='',
#               answer2='',
#               answer3='',
#               answer4='',
#               test_id=1,
#               correct_answer=''
#               )
# q2 = Question(question='',
#               answer1='',
#               answer2='',
#               answer3='',
#               answer4='',
#               test_id=1,
#               correct_answer=''
#               )
# q2 = Question(question='',
#               answer1='',
#               answer2='',
#               answer3='',
#               answer4='',
#               test_id=1,
#               correct_answer=''
#               )
# q2 = Question(question='',
#               answer1='',
#               answer2='',
#               answer3='',
#               answer4='',
#               test_id=1,
#               correct_answer=''
#               )
# q2 = Question(question='',
#               answer1='',
#               answer2='',
#               answer3='',
#               answer4='',
#               test_id=1,
#               correct_answer=''
#               )
# q2 = Question(question='',
#               answer1='',
#               answer2='',
#               answer3='',
#               answer4='',
#               test_id=1,
#               correct_answer=''
#               )

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
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
