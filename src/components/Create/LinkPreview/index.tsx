import Spinner from '@/components/Spinner';
import { Block } from '@/components/Create/Create.styled';
import Label from '@/components/Create/Label';
import LinkInfo from '@/components/Create/LinkPreview/LinkInfo';
import { MetaData } from '@/components/LinkItem';

const LinkPreivew = ({ isLoading, metaData }: { isLoading: boolean; metaData: MetaData }) => {
  return (
    <Block style={{ marginBottom: '29px' }}>
      <Label>
        미리보기
        {isLoading && <Spinner width='12px' />}
      </Label>
      {!isLoading && <LinkInfo {...metaData} />}
    </Block>
  );
};

export default LinkPreivew;
