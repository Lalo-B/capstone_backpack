from sqlalchemy.sql import text
from app.models import SCHEMA, db, environment, FlashCard

# import users when theyre made

flashcard_1 = FlashCard(
    question = 'What is the concept of spontaneous generation?',
    answer = 'living organisms could develop from nonliving or decomposing matter',
    set_id = 1
)
flashcard_2 = FlashCard(
    question = 'Who challenged the concept of spontaneous generation by showing that maggots on decaying meat came from flies, not from the meat itself?',
    answer = 'Francesco Redi',
    set_id = 1
)
flashcard_3 = FlashCard(
    question = 'Who showed that mutton broth boiled in flasks and then sealed could still develop microorganisms, which supported the theory of spontaneous generation?',
    answer = 'John Needham',
    set_id = 1
)
flashcard_4 = FlashCard(
    question = 'Who showed that flasks sealed and then boiled had no growth of microorganisms?',
    answer = 'Lazzaro Spallanzani',
    set_id = 1
)
flashcard_5 = FlashCard(
    question = 'Who proposed that air carried germs?',
    answer = 'Spallanzani',
    set_id = 1
)
flashcard_6 = FlashCard(
    question = 'Who disproved the theory of spontaneous generation?',
    answer = 'Louis Pasteur',
    set_id = 1
)
flashcard_7 = FlashCard(
    question = 'Who demonstrated that dust carried microbes and proved evidence for the existence of heat- resistant forms of bacteria?',
    answer = 'John Tyndall',
    set_id = 1
)
flashcard_8 = FlashCard(
    question = 'Who showed that a silkworm disease was caused by a fungus?',
    answer = 'Agostino Bassi',
    set_id = 1
)
flashcard_9 = FlashCard(
    question = 'Who demonstrated that the Great Potato Blight was caused by a water mold?',
    answer = 'M. J. Berkely',
    set_id = 1
)
flashcard_10 = FlashCard(
    question = 'Who showed that the pebrine disease of silkworms was caused by a protozoan parasite?',
    answer = 'Louis Pasteur',
    set_id = 1
)
flashcard_11 = FlashCard(
    question = 'Who developed a system of surgery designed to prevent microorganisms from entering wounds?',
    answer = 'John Lister',
    set_id = 1
)
flashcard_12 = FlashCard(
    question = 'What are the Koch Postulates?',
    answer = '1.The microorganisms must be present in every case of the disease but absent from healthy individuals 2.The suspected microorganisms must be isolated and grown in pure culture 3. The same disease must result when the isolated microorganism is inoculated into a healthy host 4. The same microorganism must be isolated again from the diseased host',
    set_id = 1
)
flashcard_13 = FlashCard(
    question = 'Limitations of Koch\'s Postulates',
    answer = '-Some organisms cannot be grown in pure culture -Using humans in completing the postulates is unethical -Molecular and genetic evidence may replace',
    set_id = 1
)
flashcard_14 = FlashCard(
    question = 'What is a morphologically complex and has a membrane-enclosed nucleus?',
    answer = 'Eucaryotes',
    set_id = 1
)
flashcard_15 = FlashCard(
    question = 'What let to the discovery of viruses as disease causing agents?',
    answer = 'bacterial filter that removed bacteria and larger microbes (Charles Chamberland)',
    set_id = 1
)
flashcard_16 = FlashCard(
    question = 'The five kingdom classification scheme is',
    answer = 'the Monera or Procaryotae, Protista, Fungi, Animalia, and Plantae',
    set_id = 1
)
flashcard_17 = FlashCard(
    question = 'What are ribozymes?',
    answer = 'RNA molecules that form peptide bonds and perform cellular work and replication',
    set_id = 1
)
flashcard_18 = FlashCard(
    question = 'The three domain scheme is',
    answer = 'Bacteria, Archaea, and Eucarya',
    set_id = 1
)
flashcard_19 = FlashCard(
    question = 'The three domain scheme is based on?',
    answer = 'a comparaison of ribosomal RNA',
    set_id = 1
)
flashcard_20 = FlashCard(
    question = 'The earliest cells may have been',
    answer = 'RNA surrounded by liposomes',
    set_id = 1
)
flashcard_21 = FlashCard(
    question = 'What are the three bacterial morphology?',
    answer = '-bacillus (little rod) -coccus (grain or berry) -spirillum (coiled or helical)',
    set_id = 1
)
# Assuming you have a FlashCard class defined somewhere
flashcard_22 = FlashCard(
    question="What is the largest organ in the human body?",
    answer="Skin",
    set_id=2
)

flashcard_23 = FlashCard(
    question="How many bones are in the adult human body?",
    answer="206",
    set_id=2
)

flashcard_24 = FlashCard(
    question="What is the main function of the heart?",
    answer="To pump blood throughout the body",
    set_id=2
)

flashcard_25 = FlashCard(
    question="What is the basic unit of life?",
    answer="Cell",
    set_id=2
)

flashcard_26 = FlashCard(
    question="Which system is responsible for transporting oxygen and nutrients?",
    answer="Circulatory system",
    set_id=2
)

flashcard_27 = FlashCard(
    question="What part of the brain controls balance?",
    answer="Cerebellum",
    set_id=2
)

flashcard_28 = FlashCard(
    question="What is the function of red blood cells?",
    answer="To carry oxygen",
    set_id=2
)

flashcard_29 = FlashCard(
    question="Where is the femur located?",
    answer="Thigh",
    set_id=2
)

flashcard_30 = FlashCard(
    question="What organ is primarily responsible for detoxification?",
    answer="Liver",
    set_id=2
)

flashcard_31 = FlashCard(
    question="Which muscle is responsible for breathing?",
    answer="Diaphragm",
    set_id=2
)
flashcard_32 = FlashCard(
    question="What is the unit of force in the International System of Units (SI)?",
    answer="Newton",
    set_id=3
)

flashcard_33 = FlashCard(
    question="What is the law of conservation of energy?",
    answer="Energy cannot be created or destroyed, only transformed.",
    set_id=3
)

flashcard_34 = FlashCard(
    question="What is the acceleration due to gravity on Earth?",
    answer="9.81 m/s²",
    set_id=3
)

flashcard_35 = FlashCard(
    question="What is the formula for calculating kinetic energy?",
    answer="KE = 0.5 * m * v²",
    set_id=3
)

flashcard_36 = FlashCard(
    question="What is the phenomenon where light bends as it passes through different media?",
    answer="Refraction",
    set_id=3
)

flashcard_37 = FlashCard(
    question="What is the principle that states an object in motion stays in motion unless acted upon by an external force?",
    answer="Newton's First Law of Motion",
    set_id=3
)

flashcard_38 = FlashCard(
    question="What is the speed of light in a vacuum?",
    answer="Approximately 299,792 km/s",
    set_id=3
)

flashcard_39 = FlashCard(
    question="What is the relationship between frequency and wavelength in a wave?",
    answer="Frequency is inversely proportional to wavelength.",
    set_id=3
)

flashcard_40 = FlashCard(
    question="What is the formula for calculating gravitational potential energy?",
    answer="PE = m * g * h",
    set_id=3
)

flashcard_41 = FlashCard(
    question="What is the name of the device used to measure atmospheric pressure?",
    answer="Barometer",
    set_id=3
)


def seed_flash_cards():
    db.session.add(flashcard_1)
    db.session.add(flashcard_2)
    db.session.add(flashcard_3)
    db.session.add(flashcard_4)
    db.session.add(flashcard_5)
    db.session.add(flashcard_6)
    db.session.add(flashcard_7)
    db.session.add(flashcard_8)
    db.session.add(flashcard_9)
    db.session.add(flashcard_10)
    db.session.add(flashcard_11)
    db.session.add(flashcard_12)
    db.session.add(flashcard_13)
    db.session.add(flashcard_14)
    db.session.add(flashcard_15)
    db.session.add(flashcard_16)
    db.session.add(flashcard_17)
    db.session.add(flashcard_18)
    db.session.add(flashcard_19)
    db.session.add(flashcard_20)
    db.session.add(flashcard_21)
    db.session.add(flashcard_22)
    db.session.add(flashcard_23)
    db.session.add(flashcard_24)
    db.session.add(flashcard_25)
    db.session.add(flashcard_26)
    db.session.add(flashcard_27)
    db.session.add(flashcard_28)
    db.session.add(flashcard_29)
    db.session.add(flashcard_30)
    db.session.add(flashcard_31)
    db.session.add(flashcard_32)
    db.session.add(flashcard_33)
    db.session.add(flashcard_34)
    db.session.add(flashcard_35)
    db.session.add(flashcard_36)
    db.session.add(flashcard_37)
    db.session.add(flashcard_38)
    db.session.add(flashcard_39)
    db.session.add(flashcard_40)
    db.session.add(flashcard_41)
    db.session.commit()


def undo_flash_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.flash_cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flash_cards"))

    db.session.commit()
