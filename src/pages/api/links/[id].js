// TODO 목업 API
export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const startId = parseInt(id, 10);
    const endId = startId + 10;

    const items = [];
    for (let i = startId + 1; i <= endId + 1; i += 1) {
      items.push({
        urlId: i,
        link: 'https://www.naver.com',
        title: '네이버어',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit illo delectus culpa autem fugit! Consectetur accusantium tenetur adipisci, maiores nisi expedita vitae? Veritatis id, quia iusto dicta corrupti tenetur inventore.',
        thumbnail:
          'https://www.thesprucepets.com/thmb/DRYnRM01YDiFUK1mUIifr5nj60k=/4239x0/filters:no_upscale():strip_icc()/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg',
        bookMarkCount: 12,
        tagList: ['안녕', '햄스터'],
        userId: i,
        name: `아무개 ${i}`,
        profileImage: 'https://www.claringtonvet.ca/wp-content/uploads/2019/08/e-29.jpg',
      });
    }

    res.status(200).json(items);
  } else {
    res.status(405).end();
  }
}
