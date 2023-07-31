import React, { useEffect, useState } from 'react';
import { Button, Icon, Popup, Label } from 'semantic-ui-react';
import handleReport from '../PostParts/ClickFunctions/handleReport';
import { supabase } from '../../../app/authModal';

type ReportButtonProps = {
  userId: string;
  messageId: string;
  reported: boolean;
  setReported: (value: boolean) => void;
  setUserInteractions: any;
};

const ReportButton: React.FC<ReportButtonProps> = ({ userId, messageId, reported, setReported, setUserInteractions }) => {
  const [reportCount, setReportCount] = useState(0);

  const fetchReportCount = async () => {
    let { data: reports, error } = await supabase
      .from('PostInteractions')
      .select('value')
      .eq('message_id', messageId)
      .eq('interaction_type', 'report');
  
    if (error) {
      console.error('Error fetching reports: ', error);
    } else {
      return reports.length;
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      const initialReportCount = await fetchReportCount();
      setReportCount(initialReportCount);
    };
    initialFetch();
  }, [messageId]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (userId) {
      const updatedReport = await handleReport(userId, messageId, async (reported) => {
        const updatedReportCount = await fetchReportCount();
        setReportCount(updatedReportCount);
        setReported(reported);
      });

      setUserInteractions(prevInteractions => ({...prevInteractions, report: updatedReport}));
    }
  };

  return (
    <Popup
      trigger={
        <Button
          icon
          color={reported ? 'red' : 'grey'}
          size="mini"
          style={{ margin: '0.3em' }}
          onClick={handleClick}
        >
          <Icon name='flag outline'/>
          {" " + reportCount}
        </Button>
      }
      content='Report Censorship'
      position='top center'
    />
  );
};
  
export default ReportButton;