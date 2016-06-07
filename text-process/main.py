from datetime import date


def process(line):
    [imei, ctime] = line.split('`')
    return 'imei=' + imei + '`' + 'ctime=' + ctime


def process_ctime(ctime):
    [year, month, day] = ctime.split('-')
    create_date = date(int(year), int(month), int(day))
    return create_date.strftime('%y%m%d')


def main():
    # input_file = open('./data', 'r')
    # output_file = open('./data-processed', 'w')
    #
    # try:
    #     for line in input_file:
    #         output_file.write(process(line))
    # finally:
    #     input_file.close()
    #     output_file.close()

    print process_ctime('2016-04-18')


if __name__ == "__main__":
    main()
