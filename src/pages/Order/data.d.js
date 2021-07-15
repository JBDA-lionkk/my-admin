import {FormattedMessage} from "umi";
import React from "react";

export const statusEnum = {
  0: {
    text: (
      <FormattedMessage id="pages.exception.list.status.untreated" defaultMessage="未处理"/>
    ),
    // text: formatMessage({'id':'pages.exception.list.status.untreated'}),
    color: '#f50',
    status: 'Untreated',
  },
  1: {
    text: (
      <FormattedMessage id="pages.exception.list.status.processing" defaultMessage="处理中"/>
    ),
    color: '#ff8c00',
    status: 'Processing',
  },
  2: {
    text: (
      <FormattedMessage id="pages.exception.list.status.processed" defaultMessage="已处理"/>
    ),
    color: '#87d068',
    status: 'Processed',
  }
}


export const genderEnum = {
  0: {
    text: (
      <FormattedMessage id="pages.order.list.gender.man" defaultMessage="男"/>
    ),
    status: 0,
  },
  1: {
    text: (
      <FormattedMessage id="pages.order.list.gender.women" defaultMessage="女"/>
    ),
    status: 1,
  }
}

