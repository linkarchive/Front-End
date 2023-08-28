import { LinkItemWithProfile } from '@/components/LinkItem';
import LinkItem from '@/components/LinkItem/LinkItem';

const Page = () => {
  return (
    <div>
      <LinkItem
        queryKey={[]}
        title='안녕'
        thumbnail='https://images.immediate.co.uk/production/volatile/sites/30/2013/05/christmas-ham-8555f14.jpg?resize=960,872'
        description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi nesciunt cum harum qui ipsum quos libero porro odit iusto nam eius assumenda culpa sed, quidem saepe impedit perferendis, quo magni.'
        linkId={0}
        url='https://www.naver.com'
        bookmarkCount={3}
        isRead={false}
        isMark={false}
        tagList={[
          {
            tagId: 1,
            tagName: 'asdfa',
          },
          {
            tagId: 2,
            tagName: 'asdfasw',
          },
        ]}
      />

      <LinkItemWithProfile
        nickname='ㅇ루나ㅣㅇ룬아ㅣ루ㅏㅣㄴ'
        profileImage='https://www.comingsoon.net/wp-content/uploads/sites/3/2023/07/Spongebob-Squarepants.jpg'
        queryKey={[]}
        title='안녕'
        thumbnail='https://images.immediate.co.uk/production/volatile/sites/30/2013/05/christmas-ham-8555f14.jpg?resize=960,872'
        description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi nesciunt cum harum qui ipsum quos libero porro odit iusto nam eius assumenda culpa sed, quidem saepe impedit perferendis, quo magni.'
        linkId={0}
        url='https://www.naver.com'
        bookmarkCount={3}
        isRead={false}
        isMark={false}
        tagList={[
          {
            tagId: 1,
            tagName: 'asdfa',
          },
          {
            tagId: 2,
            tagName: 'asdfasw',
          },
        ]}
      />
    </div>
  );
};

export default Page;
