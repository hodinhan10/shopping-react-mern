import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
export default function Essay(props) {
  const { essay, handleChange, expanded } = props;
  return (
    <>
      <Accordion
        expanded={expanded === essay._id}
        onChange={handleChange(essay._id)}
        key={essay._id}
        sx={{ mt: 2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '75%', flexShrink: 0, fontSize: 16 }}>
            {essay.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>
            {essay.address}
          </Typography>
        </AccordionSummary>

        <AccordionDetails >
          <Typography sx={{ fontSize: 16 }}>
            <span className="fontWeight">Date:</span>
            <span> {essay.createdAt} |</span>
          </Typography>

          {(essay.images)[0] ?
            <ImageList
              sx={{ width: 500, height: 220, }}
              cols={3}
              rowHeight={164}
              className="Center"
            >
              {(essay.images).map((item) => (
                <ImageListItem key={item}>
                  <img
                    src={item}
                    alt={item}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList> : ''
          }

          <Typography sx={{ fontSize: 16, mt: 2 }}>
            {essay.content}
          </Typography>
          <Typography sx={{ fontSize: 16, mt: 2 }}>
            <span className="fontWeight">Tên:</span>
            <span> {essay?.idUser?.seller?.name}</span>
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            <span className="fontWeight">Số điện thoại:</span>
            <span>{essay.phone}</span>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
