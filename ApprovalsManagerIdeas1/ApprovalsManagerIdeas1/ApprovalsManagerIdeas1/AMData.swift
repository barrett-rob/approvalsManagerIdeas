//
//  AMData.swift
//  ApprovalsManagerIdeas1
//
//  Created by Rob Barrett on 22/09/2014.
//  Copyright (c) 2014 Ventyx. All rights reserved.
//

import Foundation

class AMData {
    var records: [AMRecord]?
    init() {
        for i in 1...10 {
            let rec = AMRecord()
            rec.itemType = "Leave Request"
            rec.itemId = String(format: "3", arguments: [i])
            rec.itemDescription = "Please approve this " + rec.itemType!
            addRecord(rec)
        }
    }
    func addRecord(rec: AMRecord) {
        if let rs = records? {
            // noop
        } else {
            records = [AMRecord]()
        }
        records!.append(rec)
    }
    func getRecords(itemType: String) -> [AMRecord] {
        if let rs = records? {
            return rs.filter({ $0.itemType == itemType })
        } else {
            return [AMRecord]();
        }
    }
    func getItemTypes() -> [String: Int] {
        var its = [String: Int]()
        if let rs = records? {
            for r in rs {
                if let it = r.itemType? {
                    if let n = its[it] {
                        its[it] = n + 1
                    } else {
                        its[it] = 1
                    }
                }
            }
        }
        return its;
    }
}