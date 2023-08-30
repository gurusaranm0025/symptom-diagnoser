import wikipedia

def get_wikiURL(disease):
    if disease.lower() == 'gerd':
        data = wikipedia.page('Gastroesophageal reflux disease').url
    else:        
        data = wikipedia.page(disease).url
    print(data)
    # return {'URL': str(data)}
    return data
# print(get_wikiURL('Fungal Infection'))