Vue.filter('date', time => moment(time).format('YYYY-MM-DD, HH:mm'))

new Vue({
  name: 'notebook',
  el: '#notebook',
  data: {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    selectedId: localStorage.getItem('selected-id') || null,
  },
  computed: {
    selectedNote: function(){
      return this.notes.find(note => note.id === this.selectedId)
    },
    notePreview: function(){
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    sortedNotes: function(){
      return this.notes.slice().sort((a,b) => a.created - b.created)
              .sort((a,b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
    },
    linesCount: function(){
      if (this.selectedNote) {
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },
    wordsCount: function(){
      if (this.selectedNote){
        var s = this.selectedNote.content

      }
    }
  },
  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true,
    },
    selectedId: function(val, oldVal){
      localStorage.setItem('selected-id', val)
    }
  },
  methods: {
    addNote: function(){
      const time = Date.now()
      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: '**Hi!** This notebook is using [markdown](https://github.com)',
        created: time,
        favorite: false,
      }
      this.notes.push(note)
      this.selectNote(note)
    },

    removeNote: function(){
      if (this.selectedNote && confirm('Delete the note?')) {
        const index = this.notes.indexOf(this.selectedNote)

        if(index !== -1){
          this.notes.splice(index, 1)
        }
      }
    },

    selectNote: function(note){
      this.selectedId = note.id
    },

    saveNotes: function(){
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved !', new Date())
    },

    favoriteNote: function(){
      this.selectedNote.favorite ^= true
    }
  }
});