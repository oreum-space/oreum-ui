const data = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi facilis fuga nam omnis quasi reiciendis rem velit voluptatum! Ab aliquam architecto consectetur dolorem eaque enim ipsa laboriosam laudantium natus nostrum. Accusantium aliquid consectetur corporis culpa dicta dolor dolorem ducimus, enim eos facere impedit ipsa laboriosam laudantium libero maxime minima nam necessitatibus nihil nisi numquam perferendis possimus, provident quae quam quisquam repudiandae sint temporibus ut vitae voluptatibus? Asperiores aut deserunt dolores error, laboriosam nemo non nulla pariatur perferendis quasi, quibusdam, quidem ratione reprehenderit veniam voluptatum! Architecto dolorem ducimus molestiae molestias mollitia nulla odio quidem tempore! Hic placeat quasi quisquam repellat rerum.'

export default class Lorem {
  public static paragraph = data
  private static phrases = data.split(/(?<=[.!])/g).map(_ => _.trim())
  public static get phrase () {
    return Lorem.phrases[Math.floor(Lorem.phrases.length * Math.random())]
  }
  private static words = data.split(/[ .,!]/).map(_ => _.trim()).filter(word => word && word.length >= 4)
  public static get word () {
    return Lorem.words[Math.floor(Lorem.words.length * Math.random())]
  }
}

