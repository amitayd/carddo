import shelve

from metaphone import dm as phonetify

WORDS_LIST_BY_FREQUENCY = 'most_common_english_40K.txt'
PHONETIC2WORDS_PATH = 'phonetic2words.shelve'
N_TOP = 3

def build_phonetic2words_shelve(words_path):

    global phonetic2words

    phonetic2words = shelve.open(PHONETIC2WORDS_PATH, writeback=True)

    words = open(words_path, 'rb').read().splitlines()

    for i, word in enumerate(words):
        phonetic = phonetify(word)[0]
        
        if not phonetic2words.has_key(phonetic):
            phonetic2words[phonetic]  = []

        phonetic2words[phonetic].append((i, word))

    phonetic2words.close()

    phonetic2words = shelve.open(PHONETIC2WORDS_PATH)

def suggest_similar_phonetic_words(word, top_n=N_TOP):
    phonetic = phonetify(word)[0]

    similar_words = phonetic2words.get(phonetic, [])

    top_words = sorted(similar_words, key=lambda w: w[0])[:top_n]

    return [word[1] for word in top_words]

phonetic2words = shelve.open(PHONETIC2WORDS_PATH)

if __name__ == '__main__':
    build_phonetic2words_shelve(WORDS_LIST_BY_FREQUENCY)