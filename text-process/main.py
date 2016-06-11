#!/usr/bin/python
# -*- coding: utf-8 -*-

from datetime import date

MAX_DAYS = 120
ACTIVE = '1'
UN_ACTIVE = '0'


def process(line):
    [imei, ctime] = line.split('`')
    return 'imei=' + imei + '`' + 'ctime=' + ctime + '`' + 'mtime=' + ctime


def process_ctime(ctime):
    ctime_date = trans_form_date(ctime)
    return ctime_date.strftime('%y%m%d')


def process_act_days(ctime, sample_time):
    ctime_date = trans_form_date(ctime)
    sample_time_date = trans_form_date(sample_time)

    delta = sample_time_date - ctime_date

    act_days_list = [UN_ACTIVE for i in range(MAX_DAYS)]

    if delta.days < MAX_DAYS:
        act_days_list[MAX_DAYS - delta.days - 1] = ACTIVE

    act_days_str = ''.join(act_days_list)

    act_days_prev_str = act_days_str[0:60]
    act_days_next_str = act_days_str[60:120]

    act_days_prev_hex_str = complete(hex(int(act_days_prev_str, 2)))
    act_days_next_hex_str = complete(hex(int(act_days_next_str, 2)))

    return [act_days_prev_hex_str, act_days_next_hex_str]


def complete(hex_str):

    hex_str = hex_str[2:]

    count = 15 - len(hex_str)

    arr = ['0' for x in xrange(count)]

    return ''.join(arr) + hex_str


def bin2int(bin_str):
    return int(bin_str, 2)


def bin2hex(bin_str):
    return hex(int(bin_str, 2))


def trans_form_date(date_str):
    [year, month, day] = date_str.split('-')
    return date(int(year), int(month), int(day))


def main():
    # input_file = open('./000047_0', 'r')
    # output_file = open('./data-processed', 'w')
    #
    # try:
    #     for line in input_file:
    #         output_file.write(process(line))
    # finally:
    #     input_file.close()
    #     output_file.close()

    # act_days_str = '0000000000000000000000000009ac'
    # act_days_str = '00 00 00 00 00 00 00 00 00 00 00 00 00 09 ac'
    # act_days_hex_str_arr = []
    #
    # for x in xrange(0, 30, 2):
    #     act_days_hex_str_arr.append(act_days_str[x:x+2])
    #
    # act_days_hex_bytearray = [int(x, 16) for x in act_days_hex_str_arr]
    #
    # print act_days_hex_bytearray

    print process_act_days('2016-02-08', '2016-06-06')
    print process_ctime('2016-04-18')


if __name__ == "__main__":
    main()
