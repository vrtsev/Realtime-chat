import Entity from 'baiji-entity'

export default new Entity({
  id: Number,
  content: String,
  user: {
    name: String,
  }
});
