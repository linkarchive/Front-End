import LinkItemWithProfile from './LinkItemWithProfile';

// TODO any 타입 개선
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LinkItemList = ({ linkList }: { linkList: any }) => {
  return (
    <>
      {linkList.map((linkItem, idx) => (
        <LinkItemWithProfile key={idx} {...linkItem} />
      ))}
    </>
  );
};
export default LinkItemList;
