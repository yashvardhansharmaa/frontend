import React, { CSSProperties } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

const ShareButtons = ({
  title,
  url,
  twitterHandle,
  tags,
  className,
  style,
  childClassName,
}: {
  title: string;
  url: string;
  twitterHandle?: string;
  tags?: string[];
  className?: string;
  style?: CSSProperties;
  childClassName?: string;
}) => {
  return (
    <div className={className} style={style}>
      <FacebookShareButton className={childClassName} url={url}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        className={childClassName}
        url={url}
        title={title}
        via={twitterHandle}
        hashtags={tags}
      >
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton className={childClassName} url={url}>
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>

      <RedditShareButton className={childClassName} url={url} title={title}>
        <RedditIcon size={40} round={true} />
      </RedditShareButton>

      <WhatsappShareButton className={childClassName} url={url} title={title}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
